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
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  EditIcon,
  CheckIcon,
  InfoOutlineIcon,
  EmailIcon,
  PhoneIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

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
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("white", "gray.700");
  const buttonHoverBg = useColorModeValue("brand.primary", "teal.300");

  useEffect(() => {
    setProfile({
      name: initialName,
      email: initialEmail,
      mobileNumber: initialMobileNumber,
      bio: initialBio,
    });
  }, [initialName, initialEmail, initialMobileNumber, initialBio]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, email, mobileNumber } = profile;

    // Trim values to remove any extra spaces
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobileNumber = mobileNumber.trim();

    // Check if any of the required fields are empty
    if (!trimmedName || !trimmedEmail || !trimmedMobileNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields before saving.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    onSave({
      name: trimmedName,
      email: trimmedEmail,
      mobileNumber: trimmedMobileNumber,
      bio: profile.bio,
    });

    setEditMode(false);
  };

  return (
    <MotionBox
      justifyContent={"center"}
      width={{ base: "90%", md: "80%" }}
      mt={5}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Flex justifyContent={"center"}>
        <Box
          borderWidth="1px"
          borderColor={useColorModeValue("gray.300", "gray.600")}
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
            <Heading size="xl" textAlign="center" mb={4}>
              <Icon as={InfoOutlineIcon} mr={2} /> My Profile
            </Heading>
            <Stack spacing={5}>
              <FormControl isRequired>
                <FormLabel>
                  <Icon as={FaUserAlt} mr={2} /> Name
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  isReadOnly={!editMode}
                  bg={inputBg}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>
                  <EmailIcon mr={2} /> Email
                </FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  isReadOnly={!editMode}
                  bg={inputBg}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>
                  <PhoneIcon mr={2} /> Mobile Number
                </FormLabel>
                <Input
                  type="text"
                  name="mobileNumber"
                  value={profile.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  isReadOnly={!editMode}
                  bg={inputBg}
                />
              </FormControl>
              <Box>
                <FormLabel>
                  <ChatIcon mr={2} /> Bio
                </FormLabel>
                <Input
                  type="text"
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  placeholder="Enter your bio"
                  isReadOnly={!editMode}
                  bg={inputBg}
                />
              </Box>

              {editMode ? (
                <Flex justifyContent={"center"} mt={4} w="100%">
                  <MotionButton
                    onClick={handleSubmit}
                    background="brand.accent"
                    w="60%"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    _hover={{ bg: buttonHoverBg }}
                  >
                    <CheckIcon mr={2} /> Save Profile
                  </MotionButton>
                </Flex>
              ) : (
                <Flex justifyContent={"center"} mt={4} w="100%">
                  <MotionButton
                    onClick={() => setEditMode(true)}
                    background="brand.accent"
                    w="60%"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <EditIcon mr={2} /> Edit Profile
                  </MotionButton>
                </Flex>
              )}
            </Stack>
          </VStack>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default ProfileInfo;
