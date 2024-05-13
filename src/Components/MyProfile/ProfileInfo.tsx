import React, { useState, useEffect } from "react";
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
  Button,
  useToast,
} from "@chakra-ui/react";

interface ProfileInfoProps {
  name: string;
  email: string;
  mobileNumber: string;
  bio: string;
  onSave: (data: {
    name: string;
    email: string;
    mobileNumber: string;
    bio: string;
  }) => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name: initialName,
  email: initialEmail,
  mobileNumber: initialMobileNumber,
  bio: initialBio,
  onSave,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: initialName,
    email: initialEmail,
    mobileNumber: initialMobileNumber,
    bio: initialBio,
  });

  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  useEffect(() => {
    // This effect ensures that the state is updated when initial props are changed.
    // Useful for when data is fetched asynchronously.
    setProfile({
      name: initialName,
      email: initialEmail,
      mobileNumber: initialMobileNumber,
      bio: initialBio,
    });
  }, [initialName, initialEmail, initialMobileNumber, initialBio]);

  // Effect to check if we should start in edit mode
  useEffect(() => {
    if (!initialName || !initialEmail || !initialMobileNumber) {
      setEditMode(true); // If any essential info is missing, start in edit mode
    } else {
      setEditMode(false); // Otherwise, start in view mode
    }
  }, [initialName, initialEmail, initialMobileNumber, initialBio]);

  console.log(
    "info in intial:",
    initialBio,
    initialEmail,
    initialMobileNumber,
    initialName
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Check for required fields before saving
    if (!profile.name || !profile.email || !profile.mobileNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields before saving.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Save the updated profile
    onSave({
      name: profile.name,
      email: profile.email,
      mobileNumber: profile.mobileNumber,
      bio: profile.bio,
    });

    setEditMode(false); // Exit edit mode after saving
  };

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
              name={profile.name || "User Name"}
              src="/path/to/your-profile-picture.jpg"
            />
          </Flex>
          <Heading size="xl" textAlign="center">
            My Profile
          </Heading>
          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                isReadOnly={!editMode}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                isReadOnly={!editMode}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="text"
                name="mobileNumber"
                value={profile.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                isReadOnly={!editMode}
              />
            </FormControl>
            <Box>
              <FormLabel>Bio</FormLabel>
              <Input
                type="text"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Enter your bio"
                isReadOnly={!editMode}
              />
            </Box>

            {editMode ? (
              <Flex justifyContent={"center"} mt={4} w="100%">
                <Button
                  onClick={handleSubmit}
                  background="brand.accent"
                  w="60%"
                >
                  Save Profile
                </Button>
              </Flex>
            ) : (
              <Flex justifyContent={"center"} mt={4} w="100%">
                <Button
                  onClick={() => setEditMode(true)}
                  background="brand.accent"
                  w="60%"
                >
                  Edit Profile
                </Button>
              </Flex>
            )}
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ProfileInfo;
