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
import { useOrderStatus } from "../../Hooks/OrderStatusContext";
import { Order, Quest } from "../../Services/Interface";
import { updateQuestIndices } from "../../Services/Api";
import Lottie from "lottie-react";
import animationData from "../../assets/Animations/Animation - 1715874839862.json";

const TrackOrderQM: React.FC<{ order: Order }> = ({ order }) => {
  const {
    activeStep,
    setAgreeStatusQM,
    agreeStatusQM,
    statusIndex,
    setVaultBalance,
    vaultBalance,
    balanceQM,
    setBalanceQM,
    canceledBy,
  } = useOrderStatus();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

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

  const updateStatus = async () => {
    if (activeStep === 2 && !agreeStatusQM) {
      setAgreeStatusQM(true);
      const newVaultBalance = vaultBalance + order.price;
      const newBalanceQM = balanceQM - order.price;
      setBalanceQM(newBalanceQM);
      setVaultBalance(newVaultBalance);
      console.log("vaultbalance:", vaultBalance, "q:", balanceQM);

      await updateQuestIndices(order.id, statusIndex, activeStep); // Assuming a direct mapping
    }
  };

  return (
    <Box background={cardBg} p={5} roundedTop="md" shadow="lg">
      <Text fontWeight="bold" color={textColor} mb={4}>
        Quest ID: {order.id}
      </Text>
      <Flex justifyContent={"center"}>
        <Lottie animationData={animationData} loop autoplay />
      </Flex>
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
      {activeStep === 2 && (
        <Flex justify="center" mt={4}>
          <Button
            colorScheme={"yellow"}
            onClick={updateStatus}
            isDisabled={agreeStatusQM || canceledBy != ""}
          >
            Agree
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TrackOrderQM;
