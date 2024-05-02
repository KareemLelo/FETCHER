import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { Profile } from "../../Services/Interface";
import { fetchProfileData, updateProfileData } from "../../Services/Api";

const ProfileInfo = () => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  // State management
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    bio: "",
    mobileNumber: "",
  });
  const [profileSaved, setProfileSaved] = useState<boolean>(true); // Start with fields disabled
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProfile = await fetchProfileData();
        setProfile({
          name: fetchedProfile.name,
          email: fetchedProfile.email,
          mobileNumber: fetchedProfile.mobile, // Make sure this matches the API response key
          bio: fetchedProfile.bio || "",
        });
        setProfileSaved(true);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    loadData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setProfileSaved(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfileData(profile);
      setEditMode(false);
      setProfileSaved(true);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
      width={{ base: "80%", md: "80%" }}
    >
      <VStack spacing={5} align="stretch">
        <Box display="flex" justifyContent="center">
          <Avatar
            size="2xl"
            name={profile.name || "User Name"}
            src="path/to/your-profile-picture.jpg"
          />
        </Box>
        <Heading size="lg" mb={5}>
          My Profile
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired isDisabled={!editMode}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={profile.name}
                onChange={updateField}
                placeholder="Enter your name"
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>
            <FormControl isRequired isDisabled={!editMode}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={profile.email}
                onChange={updateField}
                placeholder="Enter your email"
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>
            <FormControl isDisabled={!editMode}>
              <FormLabel>Bio</FormLabel>
              <Input
                name="bio"
                value={profile.bio}
                onChange={updateField}
                placeholder="A short bio about yourself..."
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>
            <FormControl isRequired isDisabled={!editMode}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                name="mobileNumber"
                value={profile.mobileNumber}
                onChange={updateField}
                placeholder="Enter your mobile number"
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>
            {editMode && (
              <Button
                type="submit"
                backgroundColor="brand.accent"
                colorScheme="teal"
                color="brand.text"
              >
                Save Changes
              </Button>
            )}
            {!editMode && (
              <Button onClick={handleEdit} colorScheme="blue">
                Edit Profile
              </Button>
            )}
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default ProfileInfo;
