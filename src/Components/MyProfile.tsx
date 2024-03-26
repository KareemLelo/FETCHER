import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

// Define a type for the profile state
interface Profile {
  name: string;
  email: string;
  bio: string;
  mobileNumber: string;
}

const MyProfile = () => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  // Initial state for the profile, using the Profile interface
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    bio: "",
    mobileNumber: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileSaved(true);
    toast({
      title: "Profile updated.",
      description: "Your profile information has been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // Here you would send `profile` to the server for saving
  };

  const handleEdit = () => {
    setProfileSaved(false); // Allow editing again
  };

  // Update individual fields in the profile object
  const updateField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Box
      bg={cardBg}
      p={6}
      m={{ base: 5, md: 10 }}
      borderRadius="lg"
      boxShadow="md"
      color={textColor}
      width={{ base: "80%", lg: "800px" }}
    >
      <VStack spacing={5} align="stretch">
        <Box display="flex" justifyContent="center">
          <Avatar
            size="2xl"
            name={profile.name || "User Name"}
            src="path/to/your-profile-picture.jpg"
          />
        </Box>
        <Heading size="md">My Profile</Heading>
        {profileSaved ? (
          <VStack spacing={3}>
            <Text fontSize="lg">
              <strong>Name:</strong> {profile.name}
            </Text>
            <Text fontSize="lg">
              <strong>Email:</strong> {profile.email}
            </Text>
            <Text fontSize="lg">
              <strong>Bio:</strong> {profile.bio}
            </Text>
            <Text fontSize="lg">
              <strong>Mobile Number:</strong> {profile.mobileNumber}
            </Text>
            <Button onClick={handleEdit} colorScheme="blue">
              Edit Profile
            </Button>
          </VStack>
        ) : (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={updateField}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={updateField}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                  name="bio"
                  value={profile.bio}
                  onChange={updateField}
                  placeholder="A short bio about yourself..."
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  name="mobileNumber"
                  value={profile.mobileNumber}
                  onChange={updateField}
                  placeholder="Enter your mobile number"
                />
              </FormControl>
              <Button
                type="submit"
                backgroundColor="brand.primary"
                colorScheme="teal"
                color="white"
              >
                Save Changes
              </Button>
            </VStack>
          </form>
        )}
      </VStack>
    </Box>
  );
};

export default MyProfile;
