import React from "react";
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
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";
import useForm from "../Hooks/useForm"; // Ensure the path is accurate

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
  const toast = useToast();
  const { formData, handleInputChange, handleSubmit } = useForm<RegisterData>(
    {
      firstName: "",
      lastName: "",
      email: "",
      accCategory: "",
      userName: "",
      password: "",
      mobile: "",
    },
    async (data) => {
      try {
        const response = await axios.post(
          "http://localhost:3500/register",
          data
        );
        toast({
          title: "Registration successful",
          description: "You're now registered.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log(response.data);
        // Optionally use response data here
      } catch (error) {
        console.error("Error sending sign up data:", error);
        toast({
          title: "Registration failed",
          description: "There was an issue with your registration.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  );

  const setAccountType = (accType: string) => {
    handleInputChange({
      target: { name: "accCategory", value: accType },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const AccountTypes = ["Fetcher", "QuestMaker"];

  const inputCss = "p-2  rounded-xl border bg-white text-black shadow-md";

  return (
    <section className=" flex items-center justify-center m-5">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center ">
        <div className=" px-8 md:px-16 ">
          <h2 className="text-center font-bold text-2xl text-[#002D74]">
            Register
          </h2>
          <p className="text-md mt-3 text-[#002D74]">
            Be Fetcher Or QuestMaker With Us
          </p>
          <div className=" text-xs border-b border-[#002D74] py-2 text-[#002D74] shadow-sm"></div>

          <form action="" className="mt-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 grid-rows-1">
              <VStack>
                <div>
                  <HStack>
                    <input
                      className={inputCss}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleInputChange}
                      value={formData.firstName}
                    />
                    <div className="relative">
                      <input
                        className={inputCss}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        value={formData.lastName}
                      />
                    </div>
                  </HStack>
                </div>
                <div>
                  <input
                    className={inputCss}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </div>
                <div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<BsChevronDown />}
                      backgroundColor={"white"}
                      borderRadius={10}
                      textColor={"gray"}
                      width={200}
                    >
                      Acount Category: {formData.accCategory || "Select"}
                    </MenuButton>
                    <MenuList backgroundColor={"#081A51"}>
                      {AccountTypes.map((type) => (
                        <MenuItem
                          key={type}
                          onClick={() => setAccountType(type)}
                          backgroundColor={"#081A51"}
                        >
                          {type}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </div>
                <div>
                  <HStack>
                    <input
                      className={inputCss}
                      type="text"
                      name="userName"
                      placeholder="Username"
                      onChange={handleInputChange}
                      value={formData.userName}
                    />
                    <div className="relative">
                      <input
                        className={inputCss}
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={formData.password}
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
                  </HStack>
                </div>
                <div>
                  <input
                    className={inputCss}
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={handleInputChange}
                    value={formData.mobile}
                  />
                </div>
                <Divider />

                <div className=" text-md flex justify-center items-center text-[#002D74] ">
                  <button
                    type="submit"
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 shadow-md"
                  >
                    Signup
                  </button>
                </div>
              </VStack>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
