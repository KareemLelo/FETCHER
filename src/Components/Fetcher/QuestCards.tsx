import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Center,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Quest } from "../../Services/Interface";
import { useColorModeValue } from "@chakra-ui/react";

interface Props {
  quest: Quest;
  onAccept: (questId: string) => void; // Ensure this prop is passed to handle the accept functionality
}

const QuestCards = ({ quest, onAccept }: Props) => {
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");
  const buttonBg = useColorModeValue("brand.primary", "brand.accent");
  const buttonTextColor = useColorModeValue("white", "brand.text");
  const toast = useToast();

  // Handler for accepting a quest
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
    <Flex justifyContent={"center"}>
      <Card
        bg={cardBg}
        maxW="sm"
        borderRadius="lg"
        overflow="hidden"
        minW="200px"
        width={{ sm: "250px" }}
        boxShadow="xl"
      >
        <CardBody>
          <Heading
            fontSize="2xl"
            fontFamily="body"
            paddingBottom="4"
            color={textColor}
          >
            {quest.itemName}
          </Heading>
          <Text pb="1" color={textColor}>
            Item Type: {quest.itemCategory}
          </Text>
          <Text pb="1" color={textColor}>
            Quantity: {quest.itemQuantity}
          </Text>
          <Text pb="1" color={textColor}>
            Direction/Buying: {quest.itemDirection}
          </Text>
          <Text pb="1" color={textColor}>
            Weight: {quest.itemWeight} Kg
          </Text>
          <Text color={textColor}>Price: {quest.itemPrice} JD</Text>
        </CardBody>
        <CardFooter>
          <Center>
            <Button
              width="200px"
              height="50px"
              mt="-10px"
              bg={buttonBg}
              color={buttonTextColor}
              _hover={{ bg: "brand.secondary" }}
              onClick={handleAcceptQuest} // Use the handler here
            >
              Accept Quest
            </Button>
          </Center>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default QuestCards;
