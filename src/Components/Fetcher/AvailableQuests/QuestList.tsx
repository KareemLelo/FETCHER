
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
import { Quest } from "../../../Services/Interface"; // Adjust path as necessary

interface QuestListProps {
  quest: Quest;
}

const QuestList: React.FC<QuestListProps> = ({ quest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const paddingValue = { base: 2, md: 4 };
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  if (!quest) {
    return <Text>No quest data available</Text>;
  }

  return (
    <div>
      <Box
        bg={cardBg}
        p={paddingValue}
        rounded="md"
        shadow="md"
        mb={2}
        borderColor="brand.secondary"
        borderWidth="1px"
        maxWidth={{ base: "80%", md: "80%" }}
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
                {quest.itemName || "Unknown Quest"}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {quest.itemCategory || "No Type"} - {quest.itemPrice || "No Price"} JD
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
                Quantity: {quest.itemQuantity || "0"}
              </Text>
              <Divider pb={2} />
              <Text fontSize="sm" color={textColor}>
                Direction/Buying: {quest.itemDirection || "No Direction"}
              </Text>
              <Divider pb={2} />
              <Text fontSize="sm" color={textColor}>
                Weight: {quest.itemWeight || "0"} Kg
              </Text>
              <Divider pb={2} />
              <Text fontSize="sm" color={textColor}>
                Link: {quest.itemLink || "No Link Provided"}
              </Text>
              <Divider pb={2} />
             
            </Box>
            <Center>
              <Button
                width="200px"
                height="50px"
                mt={10}
                bg={"brand.accent"}
                color={"brand.text"}
                _hover={{ bg: "brand.secondary" }}
              >
                Accept Quest
              </Button>
            </Center>
          </Collapse>
        </VStack>
      </Box>
    </div>
  );
};

export default QuestList;
