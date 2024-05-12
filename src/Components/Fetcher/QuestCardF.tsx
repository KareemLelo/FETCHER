import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  useToast,
  ScaleFade,
  Link,
} from "@chakra-ui/react";
import {
  FaBoxOpen,
  FaWeightHanging,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaHandHolding,
  FaBan,
} from "react-icons/fa";
import { Quest } from "../../Services/Interface";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  quest: Quest;
  onAccept: (questId: string) => void;
}

const QuestCards: React.FC<Props> = ({ quest, onAccept }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  const buttonBg = useColorModeValue("teal.500", "teal.200");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.300");
  const toast = useToast();

  // Handler for accepting a quest
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
    <Flex justifyContent="center" my={5}>
      <ScaleFade initialScale={0.9} in={true}>
        <Box
          bg={cardBg}
          w="full"
          maxW="sm"
          mx={4}
          p={4}
          shadow="xl"
          rounded="lg"
          overflow="hidden"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.300", "gray.600")}
        >
          <VStack spacing={4} align="stretch">
            <Heading fontSize="xl" color={textColor} textAlign="center">
              {quest.itemName}
            </Heading>
            <VStack spacing={2} align={"start"}>
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaBoxOpen} mr={2} /> Type: {quest.itemCategory}
              </Text>
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaWeightHanging} mr={2} /> Weight: {quest.itemWeight}{" "}
                Kg
              </Text>
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaMapMarkedAlt} mr={2} /> Direction:{" "}
                {quest.itemDirection}
              </Text>
              <Text
                fontSize="md"
                color={textColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaMoneyBillWave} mr={2} /> Price: {quest.itemPrice} JD
              </Text>
              {quest.itemLink ? (
                <>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={ExternalLinkIcon} mr={2} />
                    <Link pl={1} href={quest.itemLink} target="_blank">
                      Item Link
                    </Link>
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={FaBan} mr={2} />
                    <Text pl={1}>Item Link</Text>
                  </Text>
                </>
              )}
            </VStack>
            <Button
              mt={4}
              bg={buttonBg}
              color="white"
              _hover={{ bg: buttonHoverBg }}
              onClick={handleAcceptQuest}
              leftIcon={<FaHandHolding />}
            >
              Accept Quest
            </Button>
          </VStack>
        </Box>
      </ScaleFade>
    </Flex>
  );
};

export default QuestCards;
