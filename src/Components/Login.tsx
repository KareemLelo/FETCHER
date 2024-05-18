import React, { useState } from "react";
import {
  useToast,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { login as apiLogin } from "../Services/Api"; // Ensure path is correct
import { useContent } from "../Hooks/ContentContext";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Animations/Animation - 1715715544544.json";

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
  return (
    <section className=" flex items-center justify-center m-5">
      <div className="bg-gray-100 flex rounded-2xl border-2 shadow-lg max-w-3xl p-5 min-h-max items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#6D9886]">Login</h2>
          <p className="text-xs mt-4 text-[#333333]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
            <Input
              variant="filled"
              bg="brand.background"
              color="brand.text"
              borderColor="brand.primary"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              _focus={{
                borderColor: "brand.primary",
                boxShadow: `0 0 0 1px ${"#6D9886"}`,
              }}
              value={loginDetails.username}
            />
            <InputGroup>
              <Input
                variant="filled"
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                bg="brand.background"
                color="brand.text"
                borderColor="brand.primary"
                placeholder="Password"
                _focus={{
                  borderColor: "brand.primary",
                  boxShadow: `0 0 0 1px ${"#6D9886"}`,
                }}
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
              bg="brand.primary"
              color="white"
              _hover={{ bg: "brand.highlight" }}
              type="submit"
            >
              Login
            </Button>
          </form>

          <div className="mt-5 text-xs border-b border-[#6D9886] py-4 text-[#333333]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#333333]">
            <p>Don't have an account?</p>
            <button
              className="py-2 px-5 bg-[#A9BFA4] border rounded-xl text-[#333333] hover:scale-110 duration-300"
              onClick={() => setContent("register")}
            >
              Register
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <Box
            w={["full", "full", "100%"]}
            display="flex"
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
        </div>
      </div>
    </section>
  );
};

export default Login;
