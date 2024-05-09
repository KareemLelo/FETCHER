import {
  SimpleGrid,
  Heading,
  Flex,
  Box,
  Text,
  useToast,
  Button,
  Center,
} from "@chakra-ui/react";
import QuestCards from "./QuestCards";
import { useEffect, useState } from "react";
import { fetchQuests, sendAcceptedQuest } from "../../Services/Api";
import { Quest } from "../../Services/Interface";
import Lottie from "lottie-react";
import animationData from "../../assets/Animations/Animation - 1715269984072.json";

const HomeContentF = () => {
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

  // Function to handle quest acceptance
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

  if (!quests || quests.length === 0) {
    return (
      <Center minHeight="60vh" flexDirection="column">
        <Box height="300px" width="300px">
          <Lottie animationData={animationData} loop autoplay />
        </Box>
        <Heading size="lg" marginBottom="8px">
          No Quests Available
        </Heading>
        <Text fontSize="lg" marginBottom="16px">
          It looks like there are no available quests right now.
        </Text>
        <Button colorScheme="blue" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </Center>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="center" width="auto" m={"10"}>
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
      </Box>
      <ul>
        <SimpleGrid
          minChildWidth={"250px"}
          spacingY="20px"
          spacingX="5px"
          width="auto"
          className="flex justify-center mt-10"
          columns={{ sm: 1, md: 3, lg: 4, xl: 5 }}
          p={7}
        >
          {quests.map((quest, index) => (
            <QuestCards key={index} quest={quest} onAccept={onAcceptQuest} />
          ))}
        </SimpleGrid>
      </ul>
    </>
  );
};

export default HomeContentF;
