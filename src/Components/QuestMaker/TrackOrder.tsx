// TrackOrder.tsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Divider,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsTruck, BsCreditCard } from "react-icons/bs";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";

// Adjusted statusSteps for horizontal layout with dynamic button text
const statusSteps = [
  {
    label: "Not travelled yet",
    actionLabel: "Start Travelling",
    colorScheme: "orange",
    icon: FaPlaneDeparture,
  },
  {
    label: "Arrived at destination",
    actionLabel: "Confirm Arrival",
    colorScheme: "yellow",
    icon: FaPlaneArrival,
  },
  {
    label: "Waiting for confirmation",
    actionLabel: "Confirm Payment",
    colorScheme: "green",
    icon: MdConfirmationNumber,
  },
  {
    label: "Payment completed",
    actionLabel: "Start Return Journey",
    colorScheme: "blue",
    icon: BsCreditCard,
  },
  {
    label: "On the way back",
    actionLabel: "Confirm Return",
    colorScheme: "purple",
    icon: BsTruck,
  },
  {
    label: "Waiting to meet you",
    actionLabel: "Complete",
    colorScheme: "pink",
    icon: BsCreditCard,
  },
];

const TrackOrder: React.FC<{
  order: {
    id: string;
  };
}> = ({ order }) => {
  const [activeStep, setActiveStep] = useState(0);
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");
  const advanceStep = () =>
    setActiveStep((prevStep) =>
      prevStep < statusSteps.length - 1 ? prevStep + 1 : prevStep
    );
  const buttonText = statusSteps[activeStep].actionLabel;

  return (
    <Box
      background={cardBg}
      p={5}
      roundedTop="md"
      shadow="lg"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      maxWidth="full"
    >
      <Text fontWeight="bold" color={textColor} mb={4}>
        Order ID: {order.id}
      </Text>
      <Divider mb={4} />
      <HStack spacing={8} justify="center">
        {statusSteps.map((step, index) => (
          <Flex key={index} align="center" direction="column">
            <Icon
              as={step.icon}
              boxSize="24px"
              color={
                index <= activeStep ? `${step.colorScheme}.400` : "gray.400"
              }
            />
            <Text fontSize="xs" color={textColor} mt={2} textAlign="center">
              {step.label}
            </Text>
          </Flex>
        ))}
      </HStack>
      <Flex justify="center" mt={4}>
        <Button colorScheme="blue" onClick={advanceStep}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
};

export default TrackOrder;
