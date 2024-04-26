import React from "react";
import {
  Box,
  Text,
  VStack,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

interface VaultProps {
  balance: number;
  transactions: Array<{
    id: string;
    amount: number;
    date: string;
    description: string;
  }>;
}

const Vault: React.FC<VaultProps> = ({ balance, transactions }) => {
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("white", "gray.200");

  return (
    <Flex align="center" justify="center">
      <Box
        w="400px"
        h="300px"
        bg={cardBg}
        rounded="2xl"
        shadow="2xl"
        position="relative"
        overflow="hidden"
      >
        <Text
          position="absolute"
          top="6"
          left="6"
          color={textColor}
          fontSize="sm"
          fontWeight="medium"
        >
          Order #3102
        </Text>

        <Flex
          direction="column"
          align="center"
          justify="center"
          position="absolute"
          inset="0"
          color={textColor}
        >
          <Box bg={cardBg} rounded="full">
            <LockIcon w="10" h="10" color={textColor} />
          </Box>
          <Text fontSize="5xl" fontWeight="bold" mt="3">
            ${balance.toFixed(2)}
          </Text>
        </Flex>

        <Text
          position="absolute"
          bottom="6"
          right="6"
          color={textColor}
          fontSize="sm"
          fontWeight="medium"
        >
          #{transactions[0].id}
        </Text>
      </Box>
    </Flex>
  );
};

export default Vault;
