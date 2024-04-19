import React from "react";
import { VStack } from "@chakra-ui/react";
import MyPassport from "./MyPassport";
import ProfileInfo from "./ProfileInfo";

const MyProfilePage: React.FC = () => {
  return (
    <VStack align="stretch" m={6}>
      <ProfileInfo />
      <MyPassport />
    </VStack>
  );
};

export default MyProfilePage;
