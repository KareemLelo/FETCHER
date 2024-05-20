import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  SimpleGrid,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import CreditCard from "./CreditCard";
import { useState } from "react";
import { CreditInfo } from "./CreditCardForm";
import CreditCardForm from "./CreditCardForm";
import { motion } from "framer-motion";

const CreditCardGrid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creditCards, setCreditCards] = useState<CreditInfo[]>([
    {
      cardNumber: "#### #### #### 3456",
      expirationDate: "12/24",
      CVV: "***",
      holderName: "KAREEM LELO",
    },
  ]);

  const buttonBg = "gray.600";
  const buttonHoverBg = "brand.hover";
  const MotionButton = motion(Button);
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const handleSaveCreditCard = (newCard: CreditInfo) => {
    setCreditCards([...creditCards, newCard]);
    onClose();
  };

  return (
    <Box p={4}>
      <MotionButton
        size="lg"
        backgroundColor={hoverBg}
        color="black"
        _hover={{ bg: "gray.300" }}
        borderColor={buttonBg}
        onClick={onOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Credit Card
      </MotionButton>
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
