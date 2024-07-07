import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
  Text,
  Center,
} from "@chakra-ui/react";
import { Quest } from "../../Services/Interface";
import {
  fetchAllQuestByCreator,
  fetchAllQuestByAcceptor,
} from "../../Services/Api";
import { useContent } from "../../Hooks/ContentContext";
import { motion } from "framer-motion";
import OrderHistoryCard from "./OrderHistoryCard";
import Lottie from "lottie-react";
import animationData from "../../assets/Animations/Animation - 1715875081645.json";

const MotionBox = motion(Box);

const OrderHistory: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const { accountType } = useContent();
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accountType === "QuestMaker") {
          const data = await fetchAllQuestByCreator();
          setQuests(data);
        } else if (accountType === "Fetcher") {
          const data = await fetchAllQuestByAcceptor();
          setQuests(data);
        }
      } catch (error) {
        console.error("Error fetching quests:", error);
      }
    };

    fetchData();
  }, [accountType]);

  if (!quests) {
    return (
      <Center minHeight="60vh" flexDirection="column">
        <MotionBox
          height="300px"
          width="300px"
          animate={{ scale: 1.1 }}
          transition={{ duration: 1, yoyo: Infinity }}
        >
          <Lottie animationData={animationData} loop autoplay />
        </MotionBox>
        <Box
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, #6a11cb 30%, #2575fc 70%)"
          bgClip="text"
          marginBottom="8px"
        >
          No Orders Available
        </Box>
        <Text fontSize="lg" marginBottom="16px">
          It looks like there are no available orders right now.
        </Text>
      </Center>
    );
  }

  return (
    <Flex direction="column" align="center" mt={10}>
      <MotionBox
        bg={cardBg}
        p={6}
        rounded="lg"
        shadow="lg"
        width={{ base: "90%", md: "75%" }}
        mb={6}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading color={textColor} mb={4} textAlign="center">
          Order History
        </Heading>
        {quests.length === 0 ? (
          <Text fontSize="lg" color={textColor} textAlign="center">
            No orders found.
          </Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {quests.map((quest) => (
              <OrderHistoryCard key={quest._id} quest={quest} />
            ))}
          </VStack>
        )}
      </MotionBox>
    </Flex>
  );
};

export default OrderHistory;
