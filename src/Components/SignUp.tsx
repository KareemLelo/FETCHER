import React, { useState } from "react";
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
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  BsChevronDown,
  BsPerson,
  BsEnvelope,
  BsTelephone,
} from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { registerUser } from "../Services/Api";
import { useContent } from "../Hooks/ContentContext";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

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
      setContent("home");
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

  // Enhanced styles
  const inputStyle = {
    variant: "filled",
    _hover: { borderColor: "brand.highlight" },
    _focus: {
      boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)",
    },
  };

  const buttonStyle = {
    bg: "brand.primary",
    color: "white",
    _hover: { bg: "brand.highlight" },
    _active: { bg: "brand.accent" },
  };

  return (
    <section className="flex items-center justify-center  ">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        bg="white"
        p={8}
        rounded="2xl"
        shadow="2xl"
        maxW="xl"
        w="full"
      >
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
            Be a Fetcher or QuestMaker With Us
          </Text>
          <Divider borderColor="brand.text" my={3} />

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <HStack spacing={3}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BsPerson} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    {...inputStyle}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    value={registerData.firstName}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BsPerson} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    {...inputStyle}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    value={registerData.lastName}
                  />
                </InputGroup>
              </HStack>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={BsEnvelope} color="gray.500" />
                </InputLeftElement>
                <Input
                  {...inputStyle}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={registerData.email}
                />
              </InputGroup>
              <Menu>
                <MenuButton
                  as={MotionButton}
                  {...buttonStyle}
                  rightIcon={<BsChevronDown />}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={BsPerson} color="gray.500" />
                </InputLeftElement>
                <Input
                  {...inputStyle}
                  type="text"
                  name="userName"
                  placeholder="Username"
                  onChange={handleInputChange}
                  value={registerData.userName}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdLockOutline} color="gray.500" />
                </InputLeftElement>
                <Input
                  {...inputStyle}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={registerData.password}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={BsTelephone} color="gray.500" />
                </InputLeftElement>
                <Input
                  {...inputStyle}
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={handleInputChange}
                  value={registerData.mobile}
                />
              </InputGroup>
              <MotionButton
                type="submit"
                {...buttonStyle}
                size="lg"
                px={10}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </MotionButton>
            </VStack>
          </form>
        </VStack>
      </MotionBox>
    </section>
  );
};

export default Register;
