import React from "react";
import {
  Box,
  Text,
  VStack,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import safeAnimation from "../../assets/Animations/Animation - 1715706627765.json"; // Path to your Lottie JSON file
import { FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

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
  const textColor = useColorModeValue("gray.600", "white");
  const MotionBox = motion(Box);

  return (
    <Flex align="center" justify="center" p={4}>
      <MotionBox
        w={["95%", "90%", "400px"]}
        h={["300px", "350px"]}
        bg={"#FFFFFF"}
        rounded="2xl"
        shadow="2xl"
        position="relative"
        overflow="hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Vault Animation */}
        <Box
          position="absolute"
          top="40%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          <Lottie
            animationData={safeAnimation}
            loop={true}
            autoplay={true}
            style={{ width: 300, height: 300 }}
          />
        </Box>

        {/* Vault Balance and Details */}
        <VStack
          spacing={2}
          position="absolute"
          bottom="8"
          left="8"
          align="flex-start"
          zIndex="2"
        >
          <Text color={textColor} fontSize="xl" fontWeight="bold">
            <Icon as={FaDollarSign} mr={2} />
            Balance: ${balance.toFixed(2)}
          </Text>
          <Text color={textColor} fontSize="md">
            Transactions
          </Text>
          {transactions.slice(0, 2).map((transaction, index) => (
            <Flex key={transaction.id} w="full" justify="space-between">
              <Text color={textColor} fontSize="sm" fontWeight="medium">
                {transaction.description}
              </Text>
              <Text color={textColor} fontSize="sm" fontWeight="medium">
                ${transaction.amount.toFixed(2)}
              </Text>
            </Flex>
          ))}
          {transactions.length > 2 && (
            <Text color={textColor} fontSize="sm" mt={2}>
              + {transactions.length - 2} more...
            </Text>
          )}
        </VStack>

        {/* Top Left Text */}
        <Text
          position="absolute"
          top="6"
          left="6"
          color={textColor}
          fontSize="sm"
          fontWeight="medium"
        >
          Vault ID: {transactions[0].id}
        </Text>
      </MotionBox>
    </Flex>
  );
};

export default Vault;
