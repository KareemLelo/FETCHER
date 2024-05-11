import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  Divider,
} from "@chakra-ui/react";
import {
  FaBoxOpen,
  FaWeightHanging,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { Quest } from "../../../Services/Interface";

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.100");

  return (
    <Flex justifyContent="center" mt={10}>
      <Box
        bg={cardBg}
        borderRadius="lg"
        overflow="hidden"
        width={{ sm: "60%", md: "60%" }}
        boxShadow="2xl" // Enhanced shadow for depth
        p={5}
        role="group"
        _hover={{ boxShadow: "dark-lg" }} // Interactive shadow on hover
      >
        <Heading
          fontSize="2xl"
          fontFamily="body"
          pb={4}
          color={textColor}
          textAlign="center"
        >
          {quest.itemName}
        </Heading>
        <VStack spacing={3} align="stretch">
          <Text pl={4} fontWeight={"bold"} color={textColor} fontSize={"xl"}>
            Details
          </Text>
          <Box pl={4}>
            <Text
              fontSize="lg"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaBoxOpen} mr={2} /> Type: {quest.itemCategory}
            </Text>
            <Divider my={2} />
            <Text
              fontSize="lg"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaWeightHanging} mr={2} /> Weight: {quest.itemWeight} Kg
            </Text>
            <Divider my={2} />
            <Text
              fontSize="lg"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaMapMarkedAlt} mr={2} /> Direction:{" "}
              {quest.itemDirection}
            </Text>
            <Divider my={2} />
            <Text
              fontSize="lg"
              color={textColor}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaMoneyBillWave} mr={2} /> Price: {quest.itemPrice} JD+
            </Text>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default QuestCard;
