import React from "react";
import { Flex, VStack, SimpleGrid } from "@chakra-ui/react";
import MyPassport from "./MyPassport";
import ProfileInfo from "./ProfileInfo";
import TicketDetails from "./TicketDetails";

const MyProfilePage: React.FC = () => {
  return (
    <Flex justifyContent={{ md: "center" }} direction="column" align="center">
      <VStack mb={4} width={"100%"}>
        <ProfileInfo />
        <SimpleGrid
          justifyContent={"center"}
          columns={{ base: 1, md: 2 }}
          width="80%"
        >
          <MyPassport />
          <TicketDetails />
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default MyProfilePage;
