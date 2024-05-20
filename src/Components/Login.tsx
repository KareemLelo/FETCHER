import React, { useState } from "react";
import {
  useToast,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Box,
  useColorModeValue,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { login as apiLogin } from "../Services/Api"; // Ensure path is correct
import { useContent } from "../Hooks/ContentContext";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Animations/Animation - 1715715544544 (1).json";

interface LoginDetails {
  username: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    username: "",
    password: "",
  });
  const { setContent, setAccountType } = useContent();
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await apiLogin(
        loginDetails.username,
        loginDetails.password
      );
      setAccountType(userData.accCategory); // Assume the role is part of the response
      setContent("home");
      toast({
        title: "Login Successful",
        description: `Welcome ${userData.userName}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const cardBg = "brand.background";
  const textColor = "gray.600";
  const buttonBg = "brand.primary";
  const buttonHoverBg = "brand.hover";

  return (
    <Flex align="center" justify="center" m={5}>
      <Flex
        bg={cardBg}
        rounded="2xl"
        borderWidth="2px"
        shadow="lg"
        maxW="3xl"
        p={5}
        minH="max"
        alignItems="center"
      >
        <Box w={["full", "full", "50%"]} p={[8, 16]}>
          <Box
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="linear(to-r, #6a11cb 30%, #2575fc 70%)"
            bgClip="text"
            mb={4}
          >
            Login
          </Box>
          <Text fontSize="xs" mt={4} color={textColor}>
            If you are already a member, easily log in
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} mt={7}>
              <Input
                variant="filled"
                color={textColor}
                borderColor={textColor}
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={loginDetails.username}
              />
              <InputGroup>
                <Input
                  variant="filled"
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  bg={cardBg}
                  color={textColor}
                  borderColor={textColor}
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={loginDetails.password}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                mt={4}
                bg={buttonBg}
                color="white"
                _hover={{ bg: buttonHoverBg }}
                type="submit"
                w="full"
              >
                Login
              </Button>
            </VStack>
          </form>

          <Box mt={5} borderBottomWidth="1px" py={4} />

          <Flex mt={3} justify="space-between" align="center" color={textColor}>
            <Text fontSize="xs">Don't have an account?</Text>
            <Button
              fontSize="sm"
              bg={buttonBg}
              color="white"
              _hover={{ bg: buttonHoverBg }}
              py={2}
              px={5}
              borderRadius="lg"
              onClick={() => setContent("register")}
            >
              Register
            </Button>
          </Flex>
        </Box>

        <Box
          display={["none", "none", "block"]}
          w="50%"
          alignItems="center"
          justifyContent="center"
        >
          <Lottie
            animationData={loginAnimation}
            loop
            autoplay
            style={{ width: "500px", height: "500px" }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
