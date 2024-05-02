import {
  Button,
  VStack,
  useToast,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Divider,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { registerUser } from "../Services/Api";
import { useState } from "react";
import { useContent } from "../ContentManagment/ContentContext";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  accCategory: string;
  userName: string;
  password: string;
  mobile: string;
}

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accCategory: "",
    userName: "",
    password: "",
    mobile: "",
  });
  const { setContent, setAccountType } = useContent();
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await registerUser(formData);
      setAccountType(userData.accCategory); // Assuming accCategory is returned
      setContent("home"); // Navigate to home
      toast({
        title: "Registration Successful",
        description: "You're now registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "error.message",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  // Enhanced styles for input fields
  const inputStyle = {
    p: 2,
    borderRadius: "xl",
    border: "2px solid",
    borderColor: "brand.secondary", // Changed to theme secondary color
    bg: "brand.light", // Very light shade for input background
    color: "brand.dark", // Dark shade for text
    _placeholder: { color: "brand.text" }, // Placeholder text color
    _hover: { borderColor: "brand.highlight" }, // Hover border color
    _focus: {
      borderColor: "brand.primary",
      boxShadow: `0 0 0 1px ${"#6D9886"}`,
    }, // Focus border color and shadow
  };

  const AccountTypes = ["Fetcher", "QuestMaker"];

  // Button styles adjusted for theme colors
  const buttonStyle = {
    bg: "brand.primary",
    color: "white",
    _hover: { bg: "brand.highlight" }, // Lighter primary color for hover state
    _active: { bg: "brand.accent" }, // Accent color for active state
  };

  return (
    <section className="flex items-center justify-center m-5">
      <Box bg="brand.background" p={5} rounded="2xl" shadow="xl" maxW="3xl">
        <VStack spacing={4}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="brand.primary"
            textAlign="center"
          >
            Register
          </Text>
          <Text fontSize="md" color="brand.text" mt={2}>
            Be Fetcher Or QuestMaker With Us
          </Text>
          <Divider borderColor="brand.text" my={3} />

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <HStack spacing={3}>
                <Input
                  {...inputStyle}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleInputChange}
                  value={formData.firstName}
                />
                <Input
                  {...inputStyle}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                  value={formData.lastName}
                />
              </HStack>
              <Input
                {...inputStyle}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={formData.email}
              />
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<BsChevronDown />}
                  {...buttonStyle}
                  borderRadius="xl"
                >
                  Account Category: {formData.accCategory || "Select"}
                </MenuButton>
                <MenuList bg="#081A51">
                  {AccountTypes.map((type) => (
                    <MenuItem
                      key={type}
                      onClick={() => (formData.accCategory = type)}
                      bg="#081A51"
                    >
                      {type}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Input
                {...inputStyle}
                type="text"
                name="userName"
                placeholder="Username"
                onChange={handleInputChange}
                value={formData.userName}
              />
              <Input
                {...inputStyle}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={formData.password}
              />
              <Input
                {...inputStyle}
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleInputChange}
                value={formData.mobile}
              />
              <Button type="submit" {...buttonStyle} size="lg" px={10}>
                Signup
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </section>
  );
};

export default Register;
