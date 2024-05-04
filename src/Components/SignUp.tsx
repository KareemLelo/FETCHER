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
import { useState } from "react";
import { registerUser } from "../Services/Api";
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
  const [registerData, setRegisterData] = useState<RegisterData>({
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
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await registerUser(registerData);
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
        description: "Could not register.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const AccountTypes = ["Fetcher", "QuestMaker"];
  const setAccountCategory = (type: string) => {
    setRegisterData({ ...registerData, accCategory: type });
  };

  // Styles remain unchanged
  const inputStyle = {
    p: 2,
    borderRadius: "xl",
    border: "2px solid",
    borderColor: "brand.secondary",
    bg: "brand.light",
    color: "brand.dark",
    _placeholder: { color: "brand.text" },
    _hover: { borderColor: "brand.highlight" },
    _focus: {
      borderColor: "brand.primary",
      boxShadow: `0 0 0 1px ${"#6D9886"}`,
    },
  };

  const buttonStyle = {
    bg: "brand.primary",
    color: "white",
    _hover: { bg: "brand.highlight" },
    _active: { bg: "brand.accent" },
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
                  value={registerData.firstName}
                />
                <Input
                  {...inputStyle}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                  value={registerData.lastName}
                />
              </HStack>
              <Input
                {...inputStyle}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={registerData.email}
              />
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<BsChevronDown />}
                  {...buttonStyle}
                  borderRadius="xl"
                >
                  Account Category: {registerData.accCategory || "Select"}
                </MenuButton>
                <MenuList>
                  {AccountTypes.map((type) => (
                    <MenuItem
                      key={type}
                      onClick={() => setAccountCategory(type)}
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
                value={registerData.userName}
              />
              <Input
                {...inputStyle}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={registerData.password}
              />
              <Input
                {...inputStyle}
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleInputChange}
                value={registerData.mobile}
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
