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
import { Order, Quest } from "../../Services/Interface";
import { updateQuestIndices } from "../../Services/Api";

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
  } = useOrderStatus();

  console.log("Initial statusIndex from context:", statusIndex);
  console.log("Initial quest from props:", order);

  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("gray.600", "white");

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
    console.log(
      `Advancing from step ${activeStep}, current statusIndex: ${statusIndex}, progressIndex: ${activeStep}`
    );

    if (statusIndex !== 2) {
      // Ensure we are not at a cancelled status
      let newProgressIndex = activeStep + 1; // Move to the next step
      let newStatusIndex = statusIndex;

      if (activeStep === 2 && !agreeStatusF) {
        setAgreeStatusF(true);
        console.log("Agreement with QuestMaker is now true.");
      } else if (activeStep === progressSteps.length - 1) {
        newStatusIndex = 3; // Move to a new status if completing the process
        setComplete(true);
        console.log("Marking the quest as complete.");
      }

      console.log(
        `Before setting - new indices to statusIndex: ${newStatusIndex}, progressIndex: ${newProgressIndex}`
      );

      // Update local context/state
      setActiveStep(newProgressIndex);
      setStatusIndex(newStatusIndex);
      setProgressIndex(newProgressIndex);

      console.log(
        `After setting - new indices to statusIndex: ${newStatusIndex}, progressIndex: ${newProgressIndex}`
      );

      try {
        const updatedQuest = await updateQuestIndices(
          order.id,
          newStatusIndex,
          newProgressIndex
        );
        console.log("Database updated:", updatedQuest);
      } catch (error) {
        console.error("Failed to update quest indices:", error);
      }
    } else {
      console.log("Quest is marked as cancelled, no further steps.");
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
                  onClick={() => advanceStep()}
                  isDisabled={isComplete || (index === 2 && !agreeStatusQM)}
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
