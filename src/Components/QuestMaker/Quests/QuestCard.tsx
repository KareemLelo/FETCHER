import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Quest } from "../../../Services/Interface";

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const cardBg = "brand.primary"; // Assuming dark mode uses 'brand.secondary'
  const textColor = "brand.text";

  return (
    <Flex justifyContent={"center"} mt={10}>
      <Card
        bg={cardBg}
        borderRadius="lg"
        overflow="hidden"
        width={{ sm: "60%", md: "60%" }}
        boxShadow="xl" // Adding shadow for better visual separation
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
          <Box fontSize={"xl"} fontFamily={"cursive"}>
            <Text pb="1" color={textColor}>
              Item Type: {quest.itemCategory}
            </Text>
            <Divider m={2}></Divider>
            <Text pb="1" color={textColor}>
              Quantity: {quest.itemQuantity}
            </Text>
            <Divider m={2}></Divider>
            <Text pb="1" color={textColor}>
              Direction/Buying: {quest.itemDirection}
            </Text>
            <Divider m={2}></Divider>
            <Text pb="1" color={textColor}>
              Weight: {quest.itemWeight} Kg
            </Text>
            <Divider m={2}></Divider>
            <Text color={textColor}>Price: {quest.itemPrice} JD+</Text>
            <Divider m={2}></Divider>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default QuestCard;
