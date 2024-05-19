import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  FaBoxOpen,
  FaWeightHanging,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaHandHolding,
  FaBan,
} from "react-icons/fa";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { Quest } from "../../Services/Interface";
import { fetchQuestByAcceptor, fetchProfileData } from "../../Services/Api"; // Import the API functions

interface Props {
  quest: Quest;
  onAccept: (questId: string) => void;
}

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const QuestCards = ({ quest, onAccept }: Props) => {
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("gray.600", "white");
  const buttonBg = useColorModeValue("teal.500", "teal.200");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.300");
  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleAcceptQuest = async () => {
    try {
      const existingQuest = await fetchQuestByAcceptor();

      if (existingQuest) {
        toast({
          title: "Quest In Progress",
          description:
            "You already have an order in progress and cannot accept another quest.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const profileData = await fetchProfileData();

      if (!profileData.passportDetails || !profileData.flightDetails) {
        toast({
          title: "Incomplete Profile",
          description:
            "Please fill in your passport and flight details before accepting a quest.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const { passportNumber, nationality, passportExpDate } =
        profileData.passportDetails;
      const { depFlightNumber, departureDate, arrFlightNumber, arrivalDate } =
        profileData.flightDetails;

      if (
        !passportNumber ||
        !nationality ||
        !passportExpDate ||
        !depFlightNumber ||
        !departureDate ||
        !arrFlightNumber ||
        !arrivalDate
      ) {
        toast({
          title: "Incomplete Profile",
          description:
            "Please fill in your passport and flight details before accepting a quest.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      onAccept(quest._id);
      toast({
        title: "Quest Accepted",
        description: "You have accepted the quest successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error accepting quest:", error);
      toast({
        title: "Error",
        description: "An error occurred while trying to accept the quest.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent={"center"}>
      <MotionBox
        bg={cardBg}
        w="90%"
        maxW="sm"
        p={4}
        shadow="2xl"
        rounded="lg"
        overflow="hidden"
        borderWidth="1px"
        borderColor={useColorModeValue("gray.300", "gray.600")}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <VStack spacing={4} align="stretch">
          <Heading fontSize="xl" color={textColor} textAlign="center">
            {quest.itemName}
          </Heading>
          <VStack spacing={2} align={"start"}>
            <Text
              fontSize="md"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaBoxOpen} mr={2} /> Type: {quest.itemCategory}
            </Text>
            <Text
              fontSize="md"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaWeightHanging} mr={2} /> Weight: {quest.itemWeight} Kg
            </Text>
            <Text
              fontSize="md"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaMapMarkedAlt} mr={2} /> Direction:{" "}
              {quest.itemDirection}
            </Text>
            <Text
              fontSize="md"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaMoneyBillWave} mr={2} /> Price: {quest.itemPrice} JD
            </Text>
            {quest.itemLink ? (
              <Text
                fontSize="lg"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={ExternalLinkIcon} mr={2} />
                <Link pl={1} href={quest.itemLink} target="_blank" isExternal>
                  Item Link <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
            ) : (
              <Text
                fontSize="lg"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaBan} mr={2} />
                <Text pl={1}>No Link Provided</Text>
              </Text>
            )}
          </VStack>
          <MotionButton
            mt={4}
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
            onClick={handleAcceptQuest}
            leftIcon={<FaHandHolding />}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Accept Quest
          </MotionButton>
        </VStack>
      </MotionBox>
    </Flex>
  );
};

export default QuestCards;
