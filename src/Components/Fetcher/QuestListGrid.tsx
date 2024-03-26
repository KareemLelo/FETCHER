import React from "react";
import { VStack } from "@chakra-ui/react";
import QuestList from "./QuestList"; // Adjust the import path as necessary
import { Quest } from "../../Services/QuestInterface"; // Adjust path as necessary

interface QuestListGridProps {
  quests: Quest[];
}

const QuestListGrid: React.FC<QuestListGridProps> = ({ quests }) => {
  // Spacing between items can also be responsive
  const stackSpacing = { base: 3, sm: 4, md: 5 };

  return (
    <VStack spacing={stackSpacing} align="stretch">
      {quests.map((quest, index) => (
        <QuestList key={index} quest={quest} />
      ))}
    </VStack>
  );
};

export default QuestListGrid;
