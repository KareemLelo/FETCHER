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
  useColorModeValue,
  Select,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { Quest } from "../../../Services/Interface";

const QuestForm: React.FC<{ onCreate: (quest: Quest) => void }> = ({
  onCreate,
}) => {
  const [quest, setQuest] = useState<Quest>({
    _id: "",
    itemName: "",
    itemCategory: "",
    itemQuantity: 1,
    itemDirection: "",
    itemWeight: 0,
    itemPrice: 0,
    itemLink: "",
    createdBy: "", // This should be set based on authenticated user session
    status: "pending",
  });
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value } = e.target;
    setQuest((prevQuest) => ({
      ...prevQuest,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/postQuest", quest);
      onCreate(response.data);
      toast({
        title: "Quest Created",
        description: "Your new quest has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to create quest", error);
      toast({
        title: "Error",
        description: "Failed to create quest.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const formBg = useColorModeValue("brand.highlight", "brand.highlight");
  const borderColor = useColorModeValue("brand.dark", "brand.light"); // Changed to new color set
  const placeholderColor = useColorModeValue("brand.dark", "brand.light"); // Changed to new color set
  const buttonBg = useColorModeValue("brand.accent", "brand.accent"); // New highlight color for buttons
  const buttonTextColor = "white";
  const cardBg = useColorModeValue("brand.primary", "brand.primary"); // Using success color for card background
  const cardTextColor = useColorModeValue("white", "gray.800"); // Keeping high contrast text for readability

  return (
    <Flex justifyContent={"center"} mt={10}>
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
                name="itemName"
                value={quest.itemName}
                onChange={handleChange}
                placeholder="Enter Quest Name..."
                borderColor={borderColor}
                _placeholder={{ color: placeholderColor }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Item Type</FormLabel>
              <Input
                name="itemCategory"
                value={quest.itemCategory}
                onChange={handleChange}
                placeholder="Enter Item Type..."
                borderColor={borderColor}
                _placeholder={{ color: placeholderColor }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <NumberInput min={1} defaultValue={1}>
                <NumberInputField
                  name="itemQuantity"
                  value={quest.itemQuantity.toString()}
                  onChange={handleChange}
                  borderColor={borderColor}
                />
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Direction</FormLabel>
              <Select
                name="itemDirection"
                value={quest.itemDirection}
                onChange={handleChange}
                borderColor={borderColor}
              >
                <option value="">Select direction</option>
                <option value="Buying">Buying</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Weight (kg)</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  name="itemWeight"
                  value={quest.itemWeight.toString()}
                  onChange={handleChange}
                  borderColor={borderColor}
                />
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price ($)</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  name="itemPrice"
                  value={quest.itemPrice.toString()}
                  onChange={handleChange}
                  borderColor={borderColor}
                />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Link (URL)</FormLabel>
              <Input
                name="itemLink"
                value={quest.itemLink}
                onChange={handleChange}
                placeholder="Enter Url Here..."
                borderColor={borderColor}
                _placeholder={{ color: placeholderColor }}
              />
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
    </Flex>
  );
};

export default QuestForm;
