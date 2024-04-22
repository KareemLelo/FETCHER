// QuestList.jsx
import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  IconButton,
  Collapse,
  useColorModeValue,
  Divider,
  Center,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Quest } from "../../Services/QuestInterface"; // Adjust path as necessary

interface QuestListProps {
  quest: Quest;
}

const QuestList: React.FC<QuestListProps> = ({ quest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const paddingValue = { base: 2, md: 4 };
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  return (
    <Box
      bg={cardBg}
      p={paddingValue}
      rounded="md"
      shadow="md"
      mb={2}
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
            <Divider pb={2} />
            <Text fontSize="sm" color={textColor}>
              Direction/Buying: {quest.direction}
            </Text>
            <Divider pb={2} />
            <Text fontSize="sm" color={textColor}>
              Weight: {quest.weight} Kg
            </Text>
            <Divider pb={2} />
            <Text fontSize="sm" color={textColor}>
              Link: {quest.link}
            </Text>
            <Divider pb={2} />
            {/* Add any additional attributes here */}
          </Box>
          <Center>
            <Button
              width="200px"
              height="50px"
              mt={10}
              bg={"brand.accent"}
              color={"brand.text"}
              _hover={{ bg: "brand.secondary" }} // Adjust hover color as needed
            >
              Accept Quest
            </Button>
          </Center>
        </Collapse>
      </VStack>
    </Box>
  );
};

export default QuestList;