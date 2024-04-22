import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import CreditCard from "./CreditCard";
import { useState } from "react";
import { CreditInfo } from "./CreditCardForm";
import CreditCardForm from "./CreditCardForm";

const CreditCardGrid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creditCards, setCreditCards] = useState<CreditInfo[]>([
    // Initial cards
    {
      cardNumber: "1234 5678 9012 3456",
      expirationDate: "12/24",
      CVV: "123",
      holderName: "John Doe",
    },

    // Add more credit card objects as needed
  ]);

  const handleSaveCreditCard = (newCard: CreditInfo) => {
    setCreditCards([...creditCards, newCard]);
    onClose(); // Close the modal/form after saving
  };

  return (
    <Box ml="50px" h="100vh">
      <Button
        width={"200px"}
        height={"50px"}
        marginTop={"10px"}
        backgroundColor={"brand.primary"} // Use the primary color from your theme
        color={"brand.text"} // Use the text color from your theme for the button text
        _hover={{ backgroundColor: "brand.accent" }} // Change to accent color on hover
        onClick={onOpen}
      >
        Add Credit Card
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <CreditCardForm onSave={handleSaveCreditCard} />
        </ModalContent>
      </Modal>

      <SimpleGrid
        minChildWidth="250px"
        spacing="20px"
        width="100%"
        className="mt-10"
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} // Adjust column count as needed
        gap={6}
      >
        {creditCards.map((creditCard, index) => (
          <CreditCard key={index} creditCard={creditCard} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CreditCardGrid;
