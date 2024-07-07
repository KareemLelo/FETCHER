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
  Link,
  HStack,
  Badge,
} from "@chakra-ui/react";
import {
  FaBoxOpen,
  FaWeightHanging,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Quest } from "../../../Services/Interface";
import { motion } from "framer-motion";
import { useOrderStatus } from "../../../Hooks/OrderStatusContext";

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.600");

  const hook = useOrderStatus();

  return (
    <Flex justifyContent="center" mt={10}>
      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        bg={cardBg}
        borderRadius="lg"
        overflow="hidden"
        width={{ sm: "90%", md: "60%" }}
        boxShadow="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        p={6}
        role="group"
      >
        <Heading
          fontSize="2xl"
          fontFamily="body"
          mb={4}
          color={textColor}
          textAlign="center"
        >
          {quest.itemName}
        </Heading>
        <VStack spacing={4} align="stretch">
          <HStack justifyContent="center">
            <Badge colorScheme="green" fontSize="lg">
              {quest.statusIndex === 0
                ? "Pending"
                : quest.statusIndex === 1
                ? "Accepted"
                : quest.statusIndex === 2
                ? "Canceled"
                : "Completed"}
            </Badge>
          </HStack>
          <Box>
            <HStack>
              <Icon as={FaBoxOpen} color="teal.500" />
              <Text fontSize="lg" color={textColor}>
                Type: {quest.itemCategory}
              </Text>
            </HStack>
            <Divider my={2} />
            <HStack>
              <Icon as={FaWeightHanging} color="teal.500" />
              <Text fontSize="lg" color={textColor}>
                Weight: {quest.itemWeight} Kg
              </Text>
            </HStack>
            <Divider my={2} />
            <HStack>
              <Icon as={FaMapMarkedAlt} color="teal.500" />
              <Text fontSize="lg" color={textColor}>
                Direction: {quest.itemDirection}
              </Text>
            </HStack>
            <Divider my={2} />
            <HStack>
              <Icon as={FaMoneyBillWave} color="teal.500" />
              <Text fontSize="lg" color={textColor}>
                Price: {quest.itemPrice} JD
              </Text>
            </HStack>
            {quest.itemLink && (
              <>
                <Divider my={2} />
                <HStack>
                  <Icon as={ExternalLinkIcon} color="teal.500" />
                  <Text fontSize="lg" color={textColor}>
                    Item Link:{" "}
                    <Link
                      href={quest.itemLink}
                      target="_blank"
                      color="teal.500"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {quest.itemLink}
                    </Link>
                  </Text>
                </HStack>
              </>
            )}
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default QuestCard;
