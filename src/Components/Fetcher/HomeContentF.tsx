import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Heading,
  Flex,
  Box,
  Text,
  useToast,
  Button,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import QuestCards from "./QuestCardF";
import { fetchQuests, sendAcceptedQuest } from "../../Services/Api";
import { Quest } from "../../Services/Interface";
import Lottie from "lottie-react";
import animationData from "../../assets/Animations/Animation - 1715269984072.json";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const HomeContentF = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchQuests()
      .then((quests) => {
        setQuests(quests);
      })
      .catch((error) => {
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
      }, 2100);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept quest",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
      <MotionBox
        display="flex"
        justifyContent="center"
        width="auto"
        mt="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          width={{ sm: "260px", md: "300px", lg: "400px" }}
          textAlign="center"
        >
          <Heading
            color="brand.text"
            fontSize={{ base: "30px", md: "30px", lg: "40px" }}
          >
            Available Quests Awaiting for You to Fetch!
          </Heading>
        </Flex>
      </MotionBox>
      <SimpleGrid minChildWidth="250px" spacing="20px" p={5}>
        {quests.map((quest, index) => (
          <QuestCards key={index} quest={quest} onAccept={onAcceptQuest} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default HomeContentF;
