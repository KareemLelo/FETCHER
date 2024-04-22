import { Button, Input, VStack } from "@chakra-ui/react";
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

// This form can be expanded with more fields and validation as needed.
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

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Input
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Input
          placeholder="Expiration Date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <Input
          placeholder="CVV"
          value={CVV}
          onChange={(e) => setCVV(e.target.value)}
        />
        <Input
          placeholder="Holder Name"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
        />
        <Button type="submit">Save Credit Card</Button>
      </VStack>
    </form>
  );
};

export default CreditCardForm;
