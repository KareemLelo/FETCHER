import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { CreditInfo } from "./CreditCardForm"; // Adjust the import path as necessary

interface Props {
  creditCard: CreditInfo;
}

const CreditCard = ({ creditCard }: Props) => {
  // Use theme colors
  const cardBg = useColorModeValue("brand.background", "brand.secondary"); // Default to secondary color for dark mode
  const textColor = useColorModeValue("brand.text", "white");
  const buttonBg = useColorModeValue("brand.primary", "brand.accent");
  const buttonHoverBg = useColorModeValue("brand.accent", "brand.primary");
  const buttonTextColor = useColorModeValue("white", "brand.text");

  return (
    <Card
      bg={cardBg}
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      width="300px"
      boxShadow="xl" // Adding a shadow for better visual separation
    >
      <CardBody>
        <Heading
          fontSize="xl"
          fontFamily="body"
          paddingBottom={4}
          color={textColor}
        >
          Visa Card
        </Heading>
        <Text color={textColor} pb={2}>
          Card Number: {creditCard.cardNumber}
        </Text>
        <Text color={textColor} pb={2}>
          Expiration Date: {creditCard.expirationDate}
        </Text>
        <Text color={textColor} pb={2}>
          CVV: {creditCard.CVV}
        </Text>
        <Text color={textColor} pb={2}>
          Card Holder: {creditCard.holderName}
        </Text>
      </CardBody>
      <CardFooter display="flex" justifyContent="center">
        <Button
          width="200px"
          height="50px"
          mt="-10px"
          bg={buttonBg}
          color={buttonTextColor}
          _hover={{ bg: buttonHoverBg }}
        >
          View Info
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditCard;
