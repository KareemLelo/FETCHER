import React from "react";
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
import { BsFillCheckCircleFill } from "react-icons/bs";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaRegHandshake,
} from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useOrderStatus } from "../../ContentManagment/OrderStatusContext";
// Assuming the separated context

const statusSteps = [
  { label: "Not traveled yet", icon: FaPlaneDeparture, colorScheme: "red" },
  {
    label: "Arriving at destination",
    icon: FaPlaneArrival,
    colorScheme: "orange",
  },
  { label: "Contact Fetcher", icon: FaRegHandshake, colorScheme: "yellow" },
  { label: "Item Purchased", icon: MdShoppingCart, colorScheme: "green" },
  { label: "Flying Back", icon: FaPlaneArrival, colorScheme: "blue" },
  {
    label: "Quest Accomplished",
    icon: BsFillCheckCircleFill,
    colorScheme: "purple",
  },
];

interface Order {
  id: string;
}

const TrackOrderQM: React.FC<{ order: Order }> = ({ order }) => {
  const { activeStep, setAgreeStatusQM, agreeStatusQM } = useOrderStatus(); // Updated context hook
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  return (
    <Box background={cardBg} p={5} roundedTop="md" shadow="lg">
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
        {activeStep === 2 && (
          <Button
            colorScheme={"yellow"}
            onClick={() => setAgreeStatusQM(true)}
            isDisabled={agreeStatusQM}
          >
            Agree
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default TrackOrderQM;
