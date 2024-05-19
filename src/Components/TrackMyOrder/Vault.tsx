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
  questId: string;
  commitmentFee: number;
  serviceFee: number;
  vaultBalance: number;
  canceledBy: string;
}

const Vault: React.FC<VaultProps> = ({
  questId,
  commitmentFee,
  serviceFee,
  vaultBalance,
  canceledBy,
}) => {
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("gray.600", "white");
  const MotionBox = motion(Box);

  return (
    <Flex align="center" justify="center" p={4}>
      <MotionBox
        w={["95%", "90%", "400px"]}
        h={["300px", "350px"]}
        bg={cardBg}
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
            Total Amount: {vaultBalance}
          </Text>
          <Text color={textColor} fontSize="md">
            Commitment Fee: {commitmentFee}
          </Text>
          <Text color={textColor} fontSize="md">
            Service Fee: {serviceFee}
          </Text>
          {canceledBy && (
            <Text color={textColor} fontSize="md">
              Canceled By: {canceledBy}
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
          Quest ID: {questId}
        </Text>
      </MotionBox>
    </Flex>
  );
};

export default Vault;
