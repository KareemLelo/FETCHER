import React from "react";
import { Flex, VStack, SimpleGrid } from "@chakra-ui/react";
import MyPassport from "./MyPassport";
import ProfileInfo from "./ProfileInfo";
import TicketDetails from "./TicketDetails";

const MyProfilePage: React.FC = () => {
  return (
    <VStack mb={4} width={"100%"}>
      <ProfileInfo />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="80%">
        <MyPassport />
        <TicketDetails />
      </SimpleGrid>
    </VStack>
  );
};

export default MyProfilePage;
