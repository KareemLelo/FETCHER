import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Divider,
  HStack,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaHome,
  FaRegHandshake,
} from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useOrderStatus } from "../../Hooks/OrderStatusContext";
import { Order } from "../../Services/Interface";
import {
  fetchProfileData,
  updateFlightDetails,
  updateQuestIndices,
} from "../../Services/Api";

const TrackOrderF: React.FC<{ order: Order }> = ({ order }) => {
  const {
    activeStep,
    statusIndex,
    setStatusIndex,
    setProgressIndex,
    setActiveStep,
    agreeStatusF,
    agreeStatusQM,
    setAgreeStatusF,
    setComplete,
    isComplete,
    canceledBy,
    commFee,
    servFee,
    vaultBalance,
    setBalanceF,
    balanceF,
    balanceQM,
    systemBalance,
    setSystemBalance,
  } = useOrderStatus();

  const cardBg = "brand.background";
  const textColor = "gray.600";

  const progressSteps = [
    {
      label: "Not traveled yet",
      actionLabel: "Start Travelling",
      icon: FaHome,
      colorScheme: "red",
    },
    {
      label: "Arriving at destination",
      actionLabel: "Confirm Arrival",
      icon: FaPlaneDeparture,
      colorScheme: "orange",
    },
    {
      label: "Contact QuestMaker",
      actionLabel: "Agree",
      icon: FaRegHandshake,
      colorScheme: "yellow",
    },
    {
      label: "Item Purchased",
      actionLabel: "Item Purchased",
      icon: MdShoppingCart,
      colorScheme: "green",
    },
    {
      label: "Flying Back",
      actionLabel: "Arrived",
      icon: FaPlaneArrival,
      colorScheme: "blue",
    },
    {
      label: "Quest Accomplished",
      actionLabel: "Complete",
      icon: BsFillCheckCircleFill,
      colorScheme: "purple",
    },
  ];

  const advanceStep = async () => {
    let newProgressIndex = activeStep + 1;
    let newStatusIndex = statusIndex;

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

    if (activeStep === 5) {
      const newBalanceF = balanceF + 0.5 * servFee + commFee;
      const newSystemBalance = systemBalance + 0.5 * servFee;
      setBalanceF(newBalanceF);
      setSystemBalance(newSystemBalance);
    }

    if (activeStep === 2 && !agreeStatusF) {
      setAgreeStatusF(true);
      await updateQuestIndices(order.id, statusIndex, newProgressIndex);
    } else if (activeStep === progressSteps.length - 1) {
      newStatusIndex = 3; // Completed status
      setComplete(true);
      await updateFlightDetails({
        departureDate: "",
        arrivalDate: "",
        depFlightNumber: "",
        arrFlightNumber: "",
        alreadyThere: false,
      });
    }

    setActiveStep(newProgressIndex);
    setStatusIndex(newStatusIndex);
    setProgressIndex(newProgressIndex);

    console.log(
      `Updated to statusIndex: ${newStatusIndex}, progressIndex: ${newProgressIndex}`
    );

    try {
      const updatedQuest = await updateQuestIndices(
        order.id,
        newStatusIndex,
        newProgressIndex
      );
      console.log("Database updated successfully:", updatedQuest);
      // Re-sync state with the response if necessary
      setStatusIndex(updatedQuest.statusIndex);
      setProgressIndex(updatedQuest.progressIndex);
    } catch (error) {
      console.error("Failed to update quest indices:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <Box background={cardBg} p={5} rounded="md" shadow="lg" maxWidth="full">
        <Text fontWeight="bold" color={textColor} mb={4}>
          Quest ID: {order.id}
        </Text>
        <Divider mb={4} />
        <VStack spacing={4}>
          {progressSteps.map((step, index) => (
            <Flex key={index} align="center" direction="column" w="100%">
              <HStack justifyContent="space-between" w="100%">
                <Text fontSize="lg" color={textColor}>
                  {step.label}
                </Text>
                <Icon
                  as={step.icon}
                  color={index <= activeStep ? step.colorScheme : "gray"}
                  w={6}
                  h={6}
                />
              </HStack>
              {index === activeStep && (
                <Button
                  mt={2}
                  colorScheme={step.colorScheme}
                  onClick={advanceStep}
                  isDisabled={
                    isComplete ||
                    (index === 2 && !agreeStatusQM) ||
                    canceledBy !== ""
                  }
                >
                  {step.actionLabel}
                </Button>
              )}
            </Flex>
          ))}
        </VStack>
      </Box>
    </motion.div>
  );
};

export default TrackOrderF;
