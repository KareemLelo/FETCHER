import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import QuestList from "./QuestList"; // Adjust the import path as necessary
import { Quest } from "../../../Services/Interface"; // Adjust path as necessary
import { fetchQuests } from "../../../Services/Api"; // Make sure the path matches where your Api.ts file is located

const AvailableQuestPage: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    fetchQuests()
    .then(quests => {
      console.log("Fetched quests:", quests); // Add this to check the structure
      setQuests(quests);
    })
      .catch((error) => console.error("Error fetching quests:", error));
  }, []);
  const stackSpacing = { base: 3, sm: 4, md: 5 };

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
            <QuestList key={index} quest={quest} />
          ))}
        </VStack>
      </Flex>
    </>
  );
};

export default AvailableQuestPage;
