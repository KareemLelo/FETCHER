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
  Text,
  Stack,
  IconButton,
  useToast,
  useColorModeValue,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
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

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProfile = await fetchProfileData();
        setProfile({
          name: fetchedProfile.name,
          email: fetchedProfile.email,
          mobileNumber: fetchedProfile.mobile,
          bio: fetchedProfile.bio || "",
        });
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
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfileData(profile);
      setEditMode(false);
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              {Object.entries(profile).map(([key, value]) => (
                <FormControl key={key} isRequired={key !== "bio"}>
                  <FormLabel>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <Input
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={value}
                    onChange={updateField}
                    placeholder={`Enter your ${key}`}
                    isReadOnly={!editMode}
                  />
                </FormControl>
              ))}
              {editMode ? (
                <ButtonGroup display="flex" justifyContent="flex-end">
                  <Button colorScheme="teal" type="submit">
                    Save <CheckIcon ml={2} />
                  </Button>
                  <Button colorScheme="red" onClick={() => setEditMode(false)}>
                    Cancel <CloseIcon ml={2} />
                  </Button>
                </ButtonGroup>
              ) : (
                <Flex justifyContent={"center"}>
                  <IconButton
                    width={"150px"}
                    aria-label="Edit profile"
                    icon={<EditIcon />}
                    onClick={handleEdit}
                    colorScheme="blue"
                  />
                </Flex>
              )}
            </Stack>
          </form>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ProfileInfo;
