// Vault.tsx
import React from "react";
import {
  VStack,
  HStack,
  Text,
  Progress,
  Divider,
  useColorModeValue,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineLock } from "react-icons/ai";

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
  const textColor = useColorModeValue("brand.text", "white");

  return (
    <VStack
      background={cardBg}
      p={5}
      rounded="md"
      shadow="lg"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      align="stretch"
      maxWidth="full"
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="bold" color={textColor} mb={4}>
          System Vault
        </Text>
        <Icon as={AiOutlineLock} color="green.500" w={6} h={6} />
      </HStack>
      <Divider mb={4} />
      <Text color={textColor} fontSize="lg">
        Balance: ${balance.toFixed(2)}
      </Text>
      <Progress
        value={(balance / 1000) * 100}
        colorScheme="green"
        size="sm"
        mb={4}
      />
      <Divider mb={4} />
      {transactions.map((transaction) => (
        <HStack key={transaction.id} justifyContent="space-between" mb={2}>
          <Text color={textColor}>{transaction.description}</Text>
          <Tooltip
            label={`Transaction ID: ${transaction.id}`}
            aria-label="A tooltip"
          >
            <Text color={textColor}>${transaction.amount.toFixed(2)}</Text>
          </Tooltip>
        </HStack>
      ))}
    </VStack>
  );
};

export default Vault;
