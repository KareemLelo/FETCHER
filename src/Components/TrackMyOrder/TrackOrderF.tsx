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
import { motion, AnimatePresence } from "framer-motion";
import { useOrderStatus } from "../../ContentManagment/OrderStatusContext";

// Define the steps for the fetcher's journey
const progressIndex = [
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

const TrackOrderF: React.FC<{ order: { id: string } }> = ({ order }) => {
  const {
    activeStep,
    statusIndex,
    setStatusIndex,
    setActiveStep,
    agreeStatusF,
    agreeStatusQM,
    setAgreeStatusF,
    setComplete,
    isComplete,
  } = useOrderStatus();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("gray.600", "white");
  /* const today = new Date().toISOString().slice(0, 10); */ // Assuming the date format is YYYY-MM-DD

  // Check if current date matches the departure date
  /* const checkDepartureDate = (departureDate) => {
    return today === departureDate;
  }; */

  const buttonText = progressIndex[activeStep].actionLabel;

  const isOrderCancelled = statusIndex === 2;

  const advanceStep = () => {
    if (!isOrderCancelled) {
      if (activeStep === 2 && !agreeStatusF) {
        setAgreeStatusF(true);
        setActiveStep(activeStep + 1);
      } else if (activeStep < progressIndex.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        setComplete(true);
      }
    }
  };

  /* const handleAction = () => {
    // Here you could insert the logic to handle the different states
    // For demonstration, this just advances the step
    advanceStep();
  }; */

  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  return (
    <MotionBox
      background={cardBg}
      p={5}
      rounded="md"
      shadow="lg"
      maxWidth="full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <Text fontWeight="bold" color={textColor} mb={4}>
        Order ID: {order.id}
      </Text>
      <Divider mb={4} />
      <VStack spacing={4}>
        {progressIndex.map((step, index) => (
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
              <MotionButton
                mt={2}
                colorScheme={step.colorScheme}
                onClick={advanceStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                isDisabled={isComplete || (index === 2 && !agreeStatusQM)}
              >
                {step.actionLabel}
              </MotionButton>
            )}
          </Flex>
        ))}
      </VStack>
    </MotionBox>
  );
};

export default TrackOrderF;
