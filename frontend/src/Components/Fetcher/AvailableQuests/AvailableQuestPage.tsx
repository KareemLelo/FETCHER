import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import QuestList from "./QuestList"; // Adjust the import path as necessary
import { Quest } from "../../../Services/Interface"; // Adjust path as necessary
import { fetchQuests, sendAcceptedQuest } from "../../../Services/Api"; // Make sure the path matches where your Api.ts file is located
import Lottie from "lottie-react";
import animationData from "../../../assets/Animations/Animation - 1715269984072.json";
import { motion } from "framer-motion";

const AvailableQuestPage: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchQuests()
      .then((quests) => {
        console.log("Fetched quests:", quests);
        setQuests(quests);
      })
      .catch((error) => {
        console.error("Error fetching quests:", error);
        toast({
          title: "Error",
          description: "Failed to fetch quests",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  const onAcceptQuest = async (questId: string) => {
    try {
      await sendAcceptedQuest(questId);
      toast({
        title: "Quest Accepted",
        description: "Updating list of quests...",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Re-fetch the quests to update the list after a short delay
      setTimeout(() => {
        fetchQuests()
          .then((quests) => {
            setQuests(quests);
            console.log("Updated quests after acceptance:", quests);
          })
          .catch((error) => {
            console.error("Error re-fetching quests:", error);
            toast({
              title: "Error",
              description: "Failed to refresh quests",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      }, 2100);
    } catch (error) {
      console.error("Error accepting quest:", error);
      toast({
        title: "Error",
        description: "Failed to accept quest",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  const stackSpacing = { base: 3, sm: 4, md: 5 };

  if (!quests || quests.length === 0) {
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
          No Quests Available
        </Box>
        <Text fontSize="lg" marginBottom="16px">
          It looks like there are no available quests right now.
        </Text>
        <MotionButton
          colorScheme="blue"
          onClick={() =>
            setTimeout(() => {
              fetchQuests()
                .then((quests) => {
                  setQuests(quests);
                })
                .catch((error) => {
                  toast({
                    title: "Error",
                    description: "Failed to refresh quests",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                });
            }, 2100)
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refresh
        </MotionButton>
      </Center>
    );
  }

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        maxWidth={"100%"}
        ml={{ base: 4, md: 10 }}
        mt={{ base: 4, md: 10 }}
      >
        <Box pb={10}>
          <Heading textColor={"brand.text"}>Browse Quests</Heading>
        </Box>

        <VStack spacing={stackSpacing} align="stretch" width="100%">
          {quests.map((quest, index) => (
            <QuestList key={index} quest={quest} onAccept={onAcceptQuest} />
          ))}
        </VStack>
      </Flex>
    </>
  );
};

export default AvailableQuestPage;
