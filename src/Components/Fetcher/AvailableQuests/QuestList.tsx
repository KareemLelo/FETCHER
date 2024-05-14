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
  ScaleFade,
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
import { Quest } from "../../../Services/Interface";
import { motion, AnimatePresence } from "framer-motion";

interface QuestListProps {
  quest: Quest;
  onAccept: (questId: string) => void;
}

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionVStack = motion(VStack);

const QuestList = ({ quest, onAccept }: QuestListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const buttonBg = useColorModeValue("teal.500", "teal.200");
  const hoverBg = useColorModeValue("teal.600", "teal.300");
  const toast = useToast();

  const handleAcceptQuest = () => {
    try {
      onAccept(quest._id);
      toast({
        title: "Quest Accepted",
        description: "You have accepted the quest successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Accept function not provided", error);
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
      <MotionBox
        bg={cardBg}
        p={4}
        rounded="lg"
        shadow="lg"
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        width="full"
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <VStack align="stretch">
          <Flex
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
          </Flex>
          <Collapse in={isOpen} animateOpacity style={{ overflow: "hidden" }}>
            <MotionVStack
              spacing={2}
              align="stretch"
              mt={2}
              initial="collapsed"
              animate={isOpen ? "open" : "collapsed"}
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
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
                    <Icon as={ExternalLinkIcon} mr={2} /> Item Link:
                    <Link pl={1} href={quest.itemLink} target="_blank">
                      {quest.itemLink}
                    </Link>
                  </Text>
                </>
              )}
            </MotionVStack>
          </Collapse>
          <Center mt={4}>
            <MotionButton
              colorScheme="teal"
              onClick={handleAcceptQuest}
              size="md"
              bg={buttonBg}
              _hover={{ bg: hoverBg }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Accept Quest
            </MotionButton>
          </Center>
        </VStack>
      </MotionBox>
    </Flex>
  );
};

export default QuestList;
