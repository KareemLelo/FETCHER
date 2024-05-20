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
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Quest } from "../../../Services/Interface";
import { createQuest } from "../../../Services/Api";
import {
  FaJediOrder,
  FaTag,
  FaWeight,
  FaDollarSign,
  FaLink,
  FaFirstOrder,
} from "react-icons/fa";
import { BiDirections } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";

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
    createdBy: "",
    statusIndex: 0,
    progressIndex: 0,
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
      const newQuest = await createQuest(quest);
      onCreate(newQuest);
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

  const formBg = useColorModeValue("brand.background", "brand.primary");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");
  const buttonBg = useColorModeValue("teal.500", "teal.200");
  const buttonTextColor = "white";

  return (
    <Flex justifyContent={"center"} mt={10}>
      <Box
        borderWidth="1px"
        borderColor={borderColor}
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
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaFirstOrder color={placeholderColor} />
                </InputLeftElement>
                <Input
                  name="itemName"
                  value={quest.itemName}
                  onChange={handleChange}
                  placeholder="Enter Quest Name..."
                  borderColor={borderColor}
                  _placeholder={{ color: placeholderColor }}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Item Type</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaTag color={placeholderColor} />
                </InputLeftElement>
                <Input
                  name="itemCategory"
                  value={quest.itemCategory}
                  onChange={handleChange}
                  placeholder="Enter Item Type..."
                  borderColor={borderColor}
                  _placeholder={{ color: placeholderColor }}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineNumber color={placeholderColor} />
                </InputLeftElement>
                <NumberInput min={1} defaultValue={1}>
                  <NumberInputField
                    name="itemQuantity"
                    value={quest.itemQuantity.toString()}
                    onChange={handleChange}
                    borderColor={borderColor}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Direction</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BiDirections color={placeholderColor} />
                </InputLeftElement>
                <Input
                  name="itemDirection"
                  value={quest.itemDirection}
                  onChange={handleChange}
                  placeholder="Enter Item Place..."
                  borderColor={borderColor}
                  _placeholder={{ color: placeholderColor }}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Weight (kg)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaWeight color={placeholderColor} />
                </InputLeftElement>
                <NumberInput min={0}>
                  <NumberInputField
                    name="itemWeight"
                    value={quest.itemWeight.toString()}
                    onChange={handleChange}
                    borderColor={borderColor}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price (JD)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaDollarSign color={placeholderColor} />
                </InputLeftElement>
                <NumberInput min={0}>
                  <NumberInputField
                    name="itemPrice"
                    value={quest.itemPrice.toString()}
                    onChange={handleChange}
                    borderColor={borderColor}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Link (URL)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaLink color={placeholderColor} />
                </InputLeftElement>
                <Input
                  name="itemLink"
                  value={quest.itemLink}
                  onChange={handleChange}
                  placeholder="Enter Url Here..."
                  borderColor={borderColor}
                  _placeholder={{ color: placeholderColor }}
                />
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              bg={buttonBg}
              color={buttonTextColor}
              size="lg"
              width="full"
              _hover={{ bg: useColorModeValue("teal.500", "teal.700") }}
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
