// TicketDetails.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  VStack,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useColorModeValue,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useOrderStatus } from "../../ContentManagment/OrderStatusContext"; // Correctly import and use the custom hook

const TicketDetails = () => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  const { setActiveStep } = useOrderStatus(); // Correctly use the custom hook

  const [profile, setProfile] = useState({
    DepFlightNumber: "",
    departureDate: "",
    arrFlightNumber: "",
    arrivalDate: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [isAlreadyThere, setIsAlreadyThere] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileSaved(true);
    toast({
      title: "Ticket details saved.",
      description: "Your travel information has been successfully saved.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEdit = () => {
    setProfileSaved(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlreadyThere = () => {
    setIsAlreadyThere(true);
    setActiveStep(2); // Adjust the step when "I'm Already There" is clicked
  };

  return (
    <Flex justifyContent={"center"}>
      <Box
        bg={cardBg}
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        color={textColor}
        w="full"
        maxW="md"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="lg" mb={4}>
            Ticket Details
          </Heading>
          {profileSaved ? (
            <>
              <Button colorScheme="blue" onClick={handleEdit}>
                Edit Details
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Departure Flight Number</FormLabel>
                <Input
                  name="DepFlightNumber"
                  value={profile.DepFlightNumber}
                  onChange={handleInputChange}
                  isDisabled={isAlreadyThere}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt={2}>Departure Date</FormLabel>
                <Input
                  type="date"
                  name="departDate"
                  value={profile.departureDate}
                  onChange={handleInputChange}
                  isDisabled={isAlreadyThere}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt={2}>Arrival Flight Number</FormLabel>
                <Input
                  type="date"
                  name="arrFlightNumber"
                  value={profile.arrFlightNumber}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt={2}>Arrival Date</FormLabel>
                <Input
                  name="arrivalDate"
                  value={profile.arrivalDate}
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
