import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import MyPassport from "./MyPassport";
import ProfileInfo from "./ProfileInfo";

const MyProfilePage: React.FC = () => {
  return (
    <Flex justifyContent={{ md: "center" }}>
      <VStack m={3} width={"100%"}>
        <ProfileInfo />
        <MyPassport />
      </VStack>
    </Flex>
  );
};

export default MyProfilePage;
