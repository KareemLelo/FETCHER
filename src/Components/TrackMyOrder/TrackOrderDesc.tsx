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

import { useOrderStatus } from "../../ContentManagment/OrderStatusContext";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const TrackOrderDesc: React.FC<{
  order: {
    id?: string;
    name: string;
    price: string;
    estimatedDelivery: string;
  };
}> = ({ order }) => {
  const { isComplete, setStatusIndex } = useOrderStatus();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
          <Text color={textColor}>
            Estimated Delivery: {order.estimatedDelivery}
          </Text>
        </Flex>
        <Divider my={3} />
        <Flex justifyContent="center" mt={4}>
          <MotionButton
            colorScheme="red"
            onClick={() => setStatusIndex(2)}
            isDisabled={isComplete}
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
