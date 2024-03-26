// QuestList.jsx
import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  IconButton,
  Collapse,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Quest } from "../../Services/QuestInterface"; // Adjust path as necessary

interface QuestListProps {
  quest: Quest;
}

const QuestList: React.FC<QuestListProps> = ({ quest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const paddingValue = { base: 2, sm: 4 };
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  return (
    <Box
      bg={cardBg}
      p={paddingValue}
      rounded="md"
      shadow="md"
      mb={4}
      borderColor="brand.secondary"
      borderWidth="1px"
    >
      <VStack align="stretch">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => setIsOpen(!isOpen)}
          cursor="pointer"
        >
          <VStack align="start">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {quest.name}
            </Text>
            <Text fontSize="sm" color={textColor}>
              {quest.itemType} - {quest.price} JD
            </Text>
          </VStack>
          <IconButton
            aria-label="Expand quest details"
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            variant="ghost"
            colorScheme="teal"
          />
        </Box>
        <Collapse in={isOpen} animateOpacity>
          <Box pt={2}>
            <Text fontSize="sm" color={textColor}>
              Quantity: {quest.quantity}
            </Text>
            <Text fontSize="sm" color={textColor}>
              Direction/Buying: {quest.direction}
            </Text>
            <Text fontSize="sm" color={textColor}>
              Weight: {quest.weight} Kg
            </Text>
            {/* Add any additional attributes here */}
          </Box>
        </Collapse>
      </VStack>
    </Box>
  );
};

export default QuestList;
