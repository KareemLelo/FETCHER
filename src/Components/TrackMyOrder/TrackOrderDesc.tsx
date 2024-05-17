import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBox, FaDollarSign, FaShippingFast, FaBan } from "react-icons/fa";
import { motion } from "framer-motion";
import { useOrderStatus } from "../../Hooks/OrderStatusContext";
import { updateCanceledBy, updateQuestIndices } from "../../Services/Api";
import { Order } from "../../Services/Interface";
import { useContent } from "../../Hooks/ContentContext";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const TrackOrderDesc: React.FC<{ order: Order }> = ({ order }) => {
  const {
    setStatusIndex,
    setCanceledBy,
    isComplete,
    canceledBy,
    progressIndex,
    handleQuestStatusChange,
  } = useOrderStatus();
  const { accountType } = useContent();

  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const cancelQuest = async () => {
    console.log(`Canceling quest by ${accountType}`);
    setStatusIndex(2);
    setCanceledBy(accountType);

    try {
      await updateCanceledBy(order.id, accountType);
      const updatedQuest = await updateQuestIndices(order.id, 2, progressIndex);
      handleQuestStatusChange(
        order.quantity,
        order.weight,
        parseFloat(order.price.substring(1))
      ); // Call the new function here
      console.log("Database updated on cancel:", updatedQuest);
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
        <Flex justifyContent="center" mt={4}>
          <MotionButton
            colorScheme="red"
            onClick={cancelQuest}
            isDisabled={isComplete || canceledBy !== null}
            w="150px"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon as={FaBan} mr={2} />
            Cancel
          </MotionButton>
        </Flex>
      </Flex>
    </MotionBox>
  );
};

export default TrackOrderDesc;
