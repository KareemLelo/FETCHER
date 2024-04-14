import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { Quest } from "../../Services/QuestInterface";
import { useColorModeValue } from "@chakra-ui/react";

interface Props {
  quests: Quest;
}

const QuestCards = ({ quests }: Props) => {
  const cardBg = useColorModeValue("brand.background", "brand.primary"); // Assuming dark mode uses 'brand.secondary'
  const textColor = useColorModeValue("brand.text", "white");
  const buttonBg = useColorModeValue("brand.primary", "brand.accent");
  const buttonTextColor = useColorModeValue("white", "brand.text");

  return (
    <Card
      bg={cardBg}
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      minW="200px"
      width={{ sm: "250px" }}
      boxShadow="xl" // Adding shadow for better visual separation
    >
      <CardBody>
        <Heading
          fontSize="2xl"
          fontFamily="body"
          paddingBottom="4"
          color={textColor}
        >
          {quests.name}
        </Heading>
        <Text pb="1" color={textColor}>
          Item Type: {quests.itemType}
        </Text>
        <Text pb="1" color={textColor}>
          Quantity: {quests.quantity}
        </Text>
        <Text pb="1" color={textColor}>
          Direction/Buying: {quests.direction}
        </Text>
        <Text pb="1" color={textColor}>
          Weight: {quests.weight} Kg
        </Text>
        <Text color={textColor}>Price: {quests.price} JD+</Text>
      </CardBody>
      <CardFooter>
        <Center>
          <Button
            width="200px"
            height="50px"
            mt="-10px"
            bg={buttonBg}
            color={buttonTextColor}
            _hover={{ bg: "brand.secondary" }} // Adjust hover color as needed
          >
            Accept Quest
          </Button>
        </Center>
      </CardFooter>
    </Card>
  );
};

export default QuestCards;
