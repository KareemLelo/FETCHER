import React from "react";
import {
  Box,
  VStack,
  Heading,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { Profile } from "../../Services/Interface";

type ProfileInfoProps = Pick<
  Profile,
  "name" | "email" | "mobileNumber" | "bio"
>;

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  mobileNumber,
  bio,
}) => {
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  return (
    <Flex justifyContent={"center"} width={{ base: "90%", md: "80%" }} mt={5}>
      <Box
        bg={cardBg}
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        color={textColor}
        width={{ base: "90%", md: "80%" }}
      >
        <VStack spacing={4} align="stretch">
          <Flex justifyContent="center">
            <Avatar
              size="2xl"
              name={name || "User Name"}
              src="/path/to/your-profile-picture.jpg"
            />
          </Flex>
          <Heading size="xl" textAlign="center">
            My Profile
          </Heading>
          <Stack spacing={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                isReadOnly={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                isReadOnly={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="text"
                name="mobileNumber"
                value={mobileNumber}
                placeholder="Enter your mobile number"
                isReadOnly={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                type="text"
                name="bio"
                value={bio}
                placeholder="Enter your bio"
                isReadOnly={true}
              />
            </FormControl>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ProfileInfo;
