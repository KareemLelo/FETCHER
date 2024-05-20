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
    {
      cardNumber: "1234 5678 9012 3456",
      expirationDate: "12/24",
      CVV: "123",
      holderName: "John Doe",
    },
  ]);

  const handleSaveCreditCard = (newCard: CreditInfo) => {
    setCreditCards([...creditCards, newCard]);
    onClose();
  };

  return (
    <Box p={4}>
      <Button
        size="lg"
        backgroundColor="teal.400"
        color="white"
        _hover={{ backgroundColor: "teal.600" }}
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
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6} mt={4}>
        {creditCards.map((creditCard, index) => (
          <CreditCard key={index} creditCard={creditCard} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CreditCardGrid;
