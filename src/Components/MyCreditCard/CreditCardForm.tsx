import {
  Button,
  Input,
  VStack,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Box,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export interface CreditInfo {
  cardNumber: string;
  expirationDate: string;
  CVV: string;
  holderName: string;
}

interface Props {
  onSave: (creditCard: CreditInfo) => void;
}

const CreditCardForm = ({ onSave }: Props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [holderName, setHolderName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ cardNumber, expirationDate, CVV, holderName });
    setCardNumber("");
    setExpirationDate("");
    setCVV("");
    setHolderName("");
  };

  const inputBg = useColorModeValue("white", "gray.700");
  const buttonHoverBg = useColorModeValue("brand.primary", "teal.300");

  return (
    <Box
      bg="linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
      p={6}
      borderRadius="lg"
      color="white"
      boxShadow="xl"
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader color="white">Add Credit Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Card Number</FormLabel>
              <Input
                bg={inputBg}
                borderColor="rgba(255, 255, 255, 0.2)"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                _placeholder={{ color: "whiteAlpha.800" }}
                color="white"
                _hover={{ borderColor: "whiteAlpha.500" }}
                _focus={{ borderColor: "whiteAlpha.700" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Expiration Date</FormLabel>
              <Input
                bg={inputBg}
                borderColor="rgba(255, 255, 255, 0.2)"
                placeholder="Expiration Date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                _placeholder={{ color: "whiteAlpha.800" }}
                color="white"
                _hover={{ borderColor: "whiteAlpha.500" }}
                _focus={{ borderColor: "whiteAlpha.700" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>CVV</FormLabel>
              <Input
                bg={inputBg}
                borderColor="rgba(255, 255, 255, 0.2)"
                placeholder="CVV"
                value={CVV}
                onChange={(e) => setCVV(e.target.value)}
                _placeholder={{ color: "whiteAlpha.800" }}
                color="white"
                _hover={{ borderColor: "whiteAlpha.500" }}
                _focus={{ borderColor: "whiteAlpha.700" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Holder Name</FormLabel>
              <Input
                bg={inputBg}
                borderColor="rgba(255, 255, 255, 0.2)"
                placeholder="Holder Name"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                _placeholder={{ color: "whiteAlpha.800" }}
                color="white"
                _hover={{ borderColor: "whiteAlpha.500" }}
                _focus={{ borderColor: "whiteAlpha.700" }}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            bg={inputBg}
            color="black"
            _hover={{ bg: buttonHoverBg }}
            mr={3}
          >
            Save
          </Button>
        </ModalFooter>
      </form>
    </Box>
  );
};

export default CreditCardForm;
