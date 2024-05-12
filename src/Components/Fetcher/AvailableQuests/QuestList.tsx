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
  Icon,
  Heading,
  Flex,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  FaBoxOpen,
  FaWeightHanging,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { Quest } from "../../../Services/Interface"; // Adjust the path as necessary

interface QuestListProps {
  quest: Quest;
  onAccept: (questId: string) => void;
}

const QuestList: React.FC<QuestListProps> = ({ quest, onAccept }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const buttonBg = useColorModeValue("teal.500", "teal.200");
  const hoverBg = useColorModeValue("teal.600", "teal.300");
  const toast = useToast();

  const handleAcceptQuest = () => {
    // Check if the onAccept function is provided
    if (onAccept) {
      onAccept(quest._id);
    } else {
      console.error("Accept function not provided");
      toast({
        title: "Error",
        description: "No accept function provided",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent="center">
      <Box
        bg={cardBg}
        p={4}
        rounded="lg"
        shadow="lg"
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        width={{ sm: "60%", md: "60%" }}
      >
        <VStack align="stretch">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => setIsOpen(!isOpen)}
            cursor="pointer"
          >
            <Heading size="md" fontWeight="bold" color={textColor}>
              {quest.itemName}
            </Heading>
            <IconButton
              aria-label={isOpen ? "Collapse details" : "Expand details"}
              icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              variant="ghost"
              size="sm"
            />
          </Box>
          <Collapse in={isOpen} animateOpacity>
            <VStack spacing={2} align="stretch" mt={2}>
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaBoxOpen} mr={2} /> Type: {quest.itemCategory}
              </Text>
              <Divider />
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaWeightHanging} mr={2} /> Weight: {quest.itemWeight}{" "}
                Kg
              </Text>
              <Divider />
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaMapMarkedAlt} mr={2} /> Direction:{" "}
                {quest.itemDirection}
              </Text>
              <Divider />
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaMoneyBillWave} mr={2} /> Price: {quest.itemPrice} JD
              </Text>
              {quest.itemLink && (
                <>
                  <Divider my={2} />
                  <Text
                    fontSize="lg"
                    color={textColor}
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={ExternalLinkIcon} mr={2} /> Item Link:{""}
                    <Link pl={1} href={quest.itemLink} target="_blank">
                      {" "}
                      {quest.itemLink}
                    </Link>
                  </Text>
                </>
              )}
            </VStack>
          </Collapse>
          <Center mt={4}>
            <Button
              colorScheme="teal"
              onClick={handleAcceptQuest}
              size="md"
              bg={buttonBg}
              _hover={{ bg: hoverBg }}
            >
              Accept Quest
            </Button>
          </Center>
        </VStack>
      </Box>
    </Flex>
  );
};

export default QuestList;
