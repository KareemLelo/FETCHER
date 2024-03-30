import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  useToast,
  VStack,
  Select,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Quest } from "../../Services/QuestInterface";

const QuestForm: React.FC = () => {
  const [quest, setQuest] = useState<Quest>({
    name: "",
    itemType: "",
    quantity: 1,
    direction: "",
    weight: 0,
    price: 0,
  });
  const [quests, setQuests] = useState<Quest[]>([]);
  const [showForm, setShowForm] = useState(true);
  const toast = useToast();

  // Applying new theme colors
  const formBg = useColorModeValue("brand.highlight", "brand.highlight");
  const borderColor = useColorModeValue("brand.dark", "brand.light"); // Changed to new color set
  const placeholderColor = useColorModeValue("brand.dark", "brand.light"); // Changed to new color set
  const buttonBg = useColorModeValue("brand.accent", "brand.accent"); // New highlight color for buttons
  const buttonTextColor = "white";
  const cardBg = useColorModeValue("brand.primary", "brand.primary"); // Using success color for card background
  const cardTextColor = useColorModeValue("white", "gray.800"); // Keeping high contrast text for readability

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setQuest((prevQuest) => ({
      ...prevQuest,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuests((prevQuests) => [...prevQuests, quest]);
    setShowForm(false);
    toast({
      title: "Quest Created",
      description: "Your new quest has been successfully created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleCreateAnother = () => {
    setShowForm(true);
    setQuest({
      name: "",
      itemType: "",
      quantity: 1,
      direction: "",
      weight: 0,
      price: 0,
    });
  };

  return (
    <VStack
      minH="100vh"
      overflow="auto"
      spacing={5}
      mt={{ base: 6, md: 10 }}
      align="center"
    >
      {showForm ? (
        <Box
          bg={formBg}
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          width={{ base: "90%", md: "70%" }}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Quest Name</FormLabel>
                <Input
                  name="name"
                  value={quest.name}
                  onChange={handleChange}
                  placeholder="Enter quest name"
                  borderColor={borderColor}
                  _placeholder={{ color: placeholderColor }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Item Type</FormLabel>
                <Input
                  name="itemType"
                  value={quest.itemType}
                  onChange={handleChange}
                  placeholder="Enter item type"
                  borderColor={borderColor}
                  _placeholder={{ color: placeholderColor }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Quantity</FormLabel>
                <NumberInput min={1} defaultValue={1}>
                  <NumberInputField
                    name="quantity"
                    value={quest.quantity.toString()}
                    onChange={handleChange}
                    borderColor={borderColor}
                  />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Direction</FormLabel>
                <Select
                  name="direction"
                  value={quest.direction}
                  onChange={handleChange}
                  borderColor={borderColor}
                >
                  <option value="">Select direction</option>
                  <option value="Sending">Sending</option>
                  <option value="Buying">Buying</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Weight (kg)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    name="weight"
                    value={quest.weight.toString()}
                    onChange={handleChange}
                    borderColor={borderColor}
                  />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price ($)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    name="price"
                    value={quest.price.toString()}
                    onChange={handleChange}
                    borderColor={borderColor}
                  />
                </NumberInput>
              </FormControl>
              <Button
                type="submit"
                bg={buttonBg}
                color={buttonTextColor}
                size="lg"
                width="full"
              >
                Create Quest
              </Button>
            </VStack>
          </form>
        </Box>
      ) : (
        <Button
          onClick={handleCreateAnother}
          bg={buttonBg}
          color={buttonTextColor}
          size="lg"
          width={{ base: "70%", md: "40%" }}
          mt={4}
          boxShadow="md"
        >
          Create Another Quest
        </Button>
      )}
      {quests.map((q, index) => (
        <Flex
          key={index}
          bg={cardBg}
          p={5}
          borderRadius="lg"
          boxShadow="xl"
          align="center"
          justify="space-between"
          width={{ base: "90%", md: "70%" }}
          color={cardTextColor}
        >
          <Stack spacing={3}>
            <Text fontSize="xl" fontWeight="bold">
              {q.name}
            </Text>
            <Text>Item Type: {q.itemType}</Text>
            <Text>Quantity: {q.quantity}</Text>
            <Text>Direction: {q.direction}</Text>
            <Text>Weight: {q.weight} kg</Text>
            <Text>Price: ${q.price}</Text>
          </Stack>
        </Flex>
      ))}
    </VStack>
  );
};

export default QuestForm;
