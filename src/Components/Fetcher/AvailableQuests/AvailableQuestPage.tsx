import React from "react";
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import QuestList from "./QuestList"; // Adjust the import path as necessary
import { Quest } from "../../../Services/QuestInterface"; // Adjust path as necessary

interface QuestListGridProps {
  quests: Quest[];
}

const AvailableQuestPage: React.FC<QuestListGridProps> = (/* { quests } */) => {
  const stackSpacing = { base: 3, sm: 4, md: 5 };

  const quest = [
    {
      name: "MacBook",
      itemType: "Laptop",
      quantity: 1,
      direction: "US",
      weight: 1.5,
      price: 1135,
      link: "#",
    },
    {
      name: "Nike Dunk Low",
      itemType: "Shoes",
      quantity: 1,
      direction: "Dubai",
      weight: 10,
      price: 112,
      link: "#",
    },
    {
      name: "تنكة جبنه",
      itemType: "Food",
      quantity: 4,
      direction: "Kuwait",
      weight: 15,
      price: 115,
      link: "#",
    },
    {
      name: "Certificate",
      itemType: "Document",
      quantity: 10,
      direction: "UK",
      weight: 0.5,
      price: 135,
      link: "#",
    },
    {
      name: "Certificate",
      itemType: "Document",
      quantity: 10,
      direction: "UK",
      weight: 0.5,
      price: 135,
      link: "#",
    },
  ];

  return (
    <>
      // Use Flex for outer container to leverage 'alignItems' for left
      alignment
      <Flex
        direction="column"
        alignItems="center"
        maxWidth={{ base: "80%", md: "60%" }}
        ml={{ base: 4, md: 10 }}
        mt={{ base: 4, md: 10 }}
      >
        <Box pb={10}>
          <Heading textColor={"brand.text"}>Browse Quests</Heading>
        </Box>
        <VStack spacing={stackSpacing} align="stretch" width="100%">
          {quest.map((quest, index) => (
            <QuestList key={index} quest={quest} />
          ))}
        </VStack>
      </Flex>
    </>
  );
};

export default AvailableQuestPage;
