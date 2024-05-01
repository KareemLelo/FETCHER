import { useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useColorModeValue,
  Divider,
  HStack,
  Flex,
} from "@chakra-ui/react";

// Define a type for the profile state
interface Profile {
  direction: string;
  departDate: string;
  arrivalDate: string;
  flightNum: string;
}

const TicketDetails = () => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  // Initial state for the profile
  const [profile, setProfile] = useState<Profile>({
    direction: "",
    departDate: "",
    arrivalDate: "",
    flightNum: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileSaved(true);
    // Implement the save functionality here
    // After successful save, show a toast notification
    toast({
      title: "Ticket details saved.",
      description: "Your travel information has been successfully saved.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEdit = () => {
    setProfileSaved(false); // Allow editing again
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlreadyThere = () => {
    // Implement what happens when user clicks "I'm Already There"
  };

  return (
    <Flex justifyContent={"center"}>
      <Box
        bg={cardBg}
        p={6}
        boxShadow="lg"
        borderRadius="lg"
        color={textColor}
        width={{ base: "80%", md: "90%" }}
      >
        <VStack spacing={4} align="stretch">
          <Heading size="lg" mb={4}>
            Ticket Details
          </Heading>

          {profileSaved ? (
            <>
              {/* Display profile details here */}
              <Button colorScheme="blue" onClick={handleEdit}>
                Edit Details
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Direction</FormLabel>
                <Input
                  name="direction"
                  value={profile.direction}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Departure Date</FormLabel>
                <Input
                  type="date"
                  name="departDate"
                  value={profile.departDate}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Arrival Date</FormLabel>
                <Input
                  type="date"
                  name="arrivalDate"
                  value={profile.arrivalDate}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Flight Number</FormLabel>
                <Input
                  name="flightNum"
                  value={profile.flightNum}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Flex justifyContent={"center"}>
                <HStack mt={4}>
                  <Button fontSize={"80%"} type="submit" colorScheme="blue">
                    Save Changes
                  </Button>
                  <Button
                    colorScheme="green"
                    fontSize={"80%"}
                    onClick={handleAlreadyThere}
                  >
                    I'm Already There
                  </Button>
                </HStack>
              </Flex>
            </form>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TicketDetails;
