import React, { useState } from "react";
import { Input, Button, useToast } from "@chakra-ui/react";
import { useContent } from "../ContentContext"; // Ensure the path is correct

interface LoginDetails {
  username: string;
  password: string;
}

const dummyUsers = [
  { username: "questmaker1", password: "password123", role: "QuestMaker" },
  { username: "fetcher1", password: "password123", role: "Fetcher" },
];

const Login = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = dummyUsers.find(
      (u) =>
        u.username === loginDetails.username &&
        u.password === loginDetails.password
    );
    if (user) {
      setAccountType(user.role); // Set user role in context
      setContent("home"); // Navigate to home or appropriate dashboard based on role
      toast({
        title: "Login Successful",
        description: `Welcome ${user.username}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
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
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <Input
              className="p-2 mt-8 rounded-xl border bg-white text-black"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
              value={loginDetails.username}
            />
            <div className="relative">
              <Input
                className="p-2 rounded-xl border w-full bg-white text-black"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={loginDetails.password}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <Button
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              type="submit"
            >
              Login
            </Button>
          </form>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              Register
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
