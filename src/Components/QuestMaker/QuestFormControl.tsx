import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Quest } from "../../Services/QuestInterface"; // Adjust the import path as needed

interface QuestFormProps {
  onSave: (newQuest: Quest) => void;
  onClose: () => void;
}

export const QuestForm = ({ onSave, onClose }: QuestFormProps) => {
  const [quest, setQuest] = useState<Quest>({
    name: "",
    itemType: "",
    quantity: 0,
    direction: "",
    weight: 0,
    price: 0,
  });
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuest((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "weight" || name === "price"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(quest);
    onClose();
    toast({
      title: "Quest added.",
      description: "Your new quest has been successfully added.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setQuest({
      name: "",
      itemType: "",
      quantity: 0,
      direction: "",
      weight: 0,
      price: 0,
    });
  };

  return (
    <>
      <ModalHeader>Create New Quest</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Quest Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={quest.name}
              onChange={handleChange}
              borderColor="#A9BFA4"
              _focus={{ borderColor: "#F2D096" }}
              placeholder="Quest Name"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="itemType">Item Type</FormLabel>
            <Input
              id="itemType"
              name="itemType"
              value={quest.itemType}
              onChange={handleChange}
              borderColor="#A9BFA4"
              _focus={{ borderColor: "#F2D096" }}
              placeholder="Item Type"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="quantity">Quantity</FormLabel>
            <NumberInput min={1}>
              <NumberInputField
                id="quantity"
                name="quantity"
                value={quest.quantity.toString()}
                onChange={handleChange}
                borderColor="#A9BFA4"
                _focus={{ borderColor: "#F2D096" }}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="direction">Direction/Buying</FormLabel>
            <Input
              id="direction"
              name="direction"
              value={quest.direction}
              onChange={handleChange}
              borderColor="#A9BFA4"
              _focus={{ borderColor: "#F2D096" }}
              placeholder="Direction/Buying"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="weight">Weight (Kg)</FormLabel>
            <NumberInput min={0}>
              <NumberInputField
                id="weight"
                name="weight"
                value={quest.weight.toString()}
                onChange={handleChange}
                borderColor="#A9BFA4"
                _focus={{ borderColor: "#F2D096" }}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="price">Price (JD)</FormLabel>
            <NumberInput min={0}>
              <NumberInputField
                id="price"
                name="price"
                value={quest.price.toString()}
                onChange={handleChange}
                borderColor="#A9BFA4"
                _focus={{ borderColor: "#F2D096" }}
              />
            </NumberInput>
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            Save Quest
          </Button>
        </form>
      </ModalBody>
    </>
  );
};

export default QuestForm;
