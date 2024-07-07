import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  FaBox,
  FaDollarSign,
  FaShippingFast,
  FaBan,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useOrderStatus } from "../../Hooks/OrderStatusContext";
import {
  updateCanceledBy,
  updateFlightDetails,
  updateQuestIndices,
  fetchProfileData,
  fetchTrackOrderProfileData,
} from "../../Services/Api";
import { Order, Profile } from "../../Services/Interface";
import { useContent } from "../../Hooks/ContentContext";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const TrackOrderDesc: React.FC<{ order: Order }> = ({ order }) => {
  const {
    setStatusIndex,
    setCanceledBy,
    setVaultBalance,
    setBalanceF,
    setBalanceQM,
    setSystemBalance,
    isComplete,
    canceledBy,
    progressIndex,
    vaultBalance,
    balanceF,
    balanceQM,
    commFee,
    servFee,
    systemBalance,
    activeStep,
    agreeStatusQM,
  } = useOrderStatus();
  const { accountType } = useContent();
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId =
          accountType === "QuestMaker" ? order.acceptedBy : order.createdBy;
        const profile = await fetchTrackOrderProfileData(userId);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [accountType, order]);

  const cancelQuest = async () => {
    console.log(`Canceling quest by ${accountType}`);
    setStatusIndex(2);
    setCanceledBy(accountType);

    let newVaultBalance = vaultBalance;
    let newBalanceF = balanceF;
    let newBalanceQM = balanceQM;
    let newSystemBalance = systemBalance;

    if (activeStep === 0) {
      newBalanceF += commFee;
      newBalanceQM += servFee;
    } else if (activeStep === 1) {
      if (accountType === "QuestMaker") {
        newBalanceF += commFee + 0.25 * servFee;
        newSystemBalance += 0.75 * servFee;
      } else if (accountType === "Fetcher") {
        newBalanceQM += servFee;
        newSystemBalance += commFee;
      }
    } else if (activeStep === 2) {
      if (accountType === "QuestMaker") {
        if (agreeStatusQM) {
          newBalanceF += commFee + 0.5 * servFee;
          newSystemBalance += 0.5 * servFee;
          newBalanceQM += order.price;
        } else {
          newBalanceF += commFee + 0.5 * servFee;
          newSystemBalance += 0.5 * servFee;
        }
      } else if (accountType === "Fetcher") {
        if (agreeStatusQM) {
          newBalanceQM += order.price + servFee;
          newSystemBalance += commFee;
          newVaultBalance -= order.price;
        } else {
          newBalanceQM += servFee;
          newSystemBalance += commFee;
        }
      }
    } else if (activeStep === 4 || activeStep === 3) {
      newBalanceQM += order.price + servFee;
      newSystemBalance += commFee;
    }

    setVaultBalance(newVaultBalance);
    setBalanceF(newBalanceF);
    setBalanceQM(newBalanceQM);
    setSystemBalance(newSystemBalance);

    console.log(
      "commfee:",
      commFee,
      "servfee:",
      servFee,
      "vaultbalance:",
      vaultBalance,
      systemBalance,
      "f:",
      balanceF,
      "q:",
      balanceQM
    );

    try {
      await updateCanceledBy(order.id, accountType);
      await updateQuestIndices(order.id, 3, progressIndex);
      console.log("Database before on cancel", canceledBy);
      if (canceledBy !== "") {
        await updateFlightDetails({
          departureDate: "",
          arrivalDate: "",
          depFlightNumber: "",
          arrFlightNumber: "",
          alreadyThere: false,
        });
        console.log("Database updated on cancel", canceledBy);
      }
    } catch (error) {
      console.error("Failed to cancel quest:", error);
    }
  };

  return (
    <MotionBox
      background={cardBg}
      p={5}
      shadow="lg"
      rounded="lg"
      maxWidth="full"
      mt={-10}
      borderWidth="1px"
      borderColor={borderColor}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Box flex={1} mr={{ md: 5 }}>
          <Flex alignItems="center" mb={2}>
            <Icon as={FaBox} w={5} h={5} color={textColor} mr={2} />
            <Text fontWeight="bold" color={textColor}>
              Order Summary
            </Text>
          </Flex>
          <Divider mb={4} />
          <Flex direction="column">
            <Flex alignItems="center">
              <Icon as={FaBox} w={4} h={4} color={textColor} mr={2} />
              <Text color={textColor}>Item: {order.name}</Text>
            </Flex>
            <Divider my={3} />
            <Flex alignItems="center">
              <Icon as={FaDollarSign} w={4} h={4} color={textColor} mr={2} />
              <Text color={textColor}>Price: {order.price}</Text>
            </Flex>
            <Divider my={3} />
            <Flex alignItems="center">
              <Icon as={FaShippingFast} w={4} h={4} color={textColor} mr={2} />
              <Text color={textColor}>Quantity: {order.quantity}</Text>
            </Flex>
            <Divider my={3} />
            <Flex alignItems="center">
              <Icon as={FaShippingFast} w={4} h={4} color={textColor} mr={2} />
              <Text color={textColor}>Weight: {order.weight}kg</Text>
            </Flex>
            <Divider my={3} />
            <Flex alignItems="center">
              <Icon as={FaShippingFast} w={4} h={4} color={textColor} mr={2} />
              <Text color={textColor}>Direction: {order.direction}</Text>
            </Flex>
            <Divider my={3} />
            <Flex alignItems="center">
              <Icon as={FaShippingFast} w={4} h={4} color={textColor} mr={2} />
              <Text color={textColor}>Category: {order.category}</Text>
            </Flex>
            <Divider my={3} />
          </Flex>
        </Box>
        <Box flex={1}>
          <Flex alignItems="center" mb={2}>
            <Icon as={FaUser} w={5} h={5} color={textColor} mr={2} />
            <Text fontWeight="bold" color={textColor}>
              User Details
            </Text>
          </Flex>
          <Divider mb={4} />
          {userProfile && (
            <Flex direction="column">
              <Text color={textColor}>Name: {userProfile.name}</Text>
              <Divider my={3} />
              <Text color={textColor}>Email: {userProfile.email}</Text>
              <Divider my={3} />
              <Text color={textColor}>Mobile: {userProfile.mobileNumber}</Text>
              {userProfile.flightDetails.depFlightNumber && (
                <>
                  <Divider my={3} />
                  <Text color={textColor}>
                    Departure Date:{" "}
                    {new Date(
                      userProfile.flightDetails.departureDate
                    ).toLocaleDateString()}
                  </Text>
                </>
              )}
              {userProfile.flightDetails.arrFlightNumber && (
                <>
                  <Divider my={3} />
                  <Text color={textColor}>
                    Arrival Date:{" "}
                    {new Date(
                      userProfile.flightDetails.arrivalDate
                    ).toLocaleDateString()}
                  </Text>
                </>
              )}
            </Flex>
          )}
        </Box>
      </Flex>
      <Flex justifyContent="center" mt={4}>
        <MotionButton
          colorScheme="red"
          onClick={cancelQuest}
          isDisabled={isComplete || canceledBy !== ""}
          w="150px"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon as={FaBan} mr={2} />
          Cancel
        </MotionButton>
      </Flex>
    </MotionBox>
  );
};

export default TrackOrderDesc;
