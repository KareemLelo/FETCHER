import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Quest } from "../../../Services/Interface";

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  return (
    <VStack
      bg="gray.100"
      p={5}
      borderRadius="lg"
      boxShadow="xl"
      align="center"
      justify="space-between"
      width="90%"
      spacing={4}
    >
      <Text fontSize="2xl" fontWeight="bold">
        {quest.itemName}
      </Text>
      <Text>Category: {quest.itemCategory}</Text>
      <Text>Quantity: {quest.itemQuantity}</Text>
      <Text>Direction: {quest.itemDirection}</Text>
      <Text>Weight: {quest.itemWeight} kg</Text>
      <Text>Price: ${quest.itemPrice}</Text>
      {quest.itemLink && <Text>Link: {quest.itemLink}</Text>}
      <Text>Status: {quest.status}</Text>
    </VStack>
  );
};

export default QuestCard;
