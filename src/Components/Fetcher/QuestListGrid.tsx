import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import QuestList from "./QuestList"; // Adjust the import path as necessary
import { Quest } from "../../Services/QuestInterface"; // Adjust path as necessary

interface QuestListGridProps {
  quests: Quest[];
}

const QuestListGrid: React.FC<QuestListGridProps> = ({ quests }) => {
  const stackSpacing = { base: 3, sm: 4, md: 5 };

  return (
    // Use Flex for outer container to leverage 'alignItems' for left alignment
    <Flex
      direction="column"
      alignItems="flex-start"
      maxWidth={{ base: "80%", md: "80%", lg: "800" }}
      w="100%"
      ml={{ base: 4, md: 10 }}
      mt={{ base: 4, md: 10 }}
    >
      <VStack spacing={stackSpacing} align="stretch" width="100%">
        {quests.map((quest, index) => (
          <QuestList key={index} quest={quest} />
        ))}
      </VStack>
    </Flex>
  );
};

export default QuestListGrid;
