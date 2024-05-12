import { useState, ChangeEvent, useEffect } from "react";
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
  Flex,
} from "@chakra-ui/react";
import { useOrderStatus } from "../../ContentManagment/OrderStatusContext";

interface TicketDetailsProps {
  departureFlightNumber: string;
  departureDate: string;
  arrivalFlightNumber: string;
  arrivalDate: string;
}

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const TicketDetails: React.FC<TicketDetailsProps> = ({
  departureFlightNumber: initialDepartureFlightNumber,
  departureDate: initialDepartureDate,
  arrivalFlightNumber: initialArrivalFlightNumber,
  arrivalDate: initialArrivalDate,
}) => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  const { setActiveStep } = useOrderStatus();

  const [profile, setProfile] = useState({
    departureFlightNumber: initialDepartureFlightNumber,
    departureDate: formatDate(initialDepartureDate),
    arrivalFlightNumber: initialArrivalFlightNumber,
    arrivalDate: formatDate(initialArrivalDate),
  });
  const [profileSaved, setProfileSaved] = useState(true);
  const [isAlreadyThere, setIsAlreadyThere] = useState(false);

  // Update the profile whenever initial props change
  useEffect(() => {
    setProfile({
      departureFlightNumber: initialDepartureFlightNumber,
      departureDate: formatDate(initialDepartureDate),
      arrivalFlightNumber: initialArrivalFlightNumber,
      arrivalDate: formatDate(initialArrivalDate),
    });
  }, [
    initialDepartureFlightNumber,
    initialDepartureDate,
    initialArrivalFlightNumber,
    initialArrivalDate,
  ]);

  const handleEdit = () => {
    setProfileSaved(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlreadyThere = () => {
    setIsAlreadyThere(true);
    setActiveStep(1);
    toast({
      title: "Status Updated",
      description: "You've indicated that you're already at your destination.",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Flex justifyContent={"center"} width="100%" mt={5}>
      <Box
        bg={cardBg}
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        color={textColor}
        width={{ base: "90%", md: "80%" }}
      >
        <VStack spacing={4} align="stretch">
          <Heading size="xl" textAlign="center">
            Ticket Details
          </Heading>
          <Flex justifyContent={"center"}>
            <Button
              colorScheme="green"
              onClick={handleAlreadyThere}
              w="60%"
              mb={4}
            >
              I'm Already There
            </Button>
          </Flex>

          {profileSaved ? (
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>Departure Flight Number</FormLabel>
                <Input
                  type="text"
                  name="departureFlightNumber"
                  value={profile.departureFlightNumber}
                  placeholder="Departure Flight Number"
                  isReadOnly={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Departure Date</FormLabel>
                <Input
                  type="date"
                  name="departureDate"
                  value={profile.departureDate}
                  placeholder="Departure Date"
                  isReadOnly={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Arrival Flight Number</FormLabel>
                <Input
                  type="text"
                  name="arrivalFlightNumber"
                  value={profile.arrivalFlightNumber}
                  placeholder="Arrival Flight Number"
                  isReadOnly={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Arrival Date</FormLabel>
                <Input
                  type="date"
                  name="arrivalDate"
                  value={profile.arrivalDate}
                  placeholder="Arrival Date"
                  isReadOnly={true}
                />
              </FormControl>

              <Button colorScheme="blue" onClick={handleEdit} w="60%">
                Edit Details
              </Button>
            </VStack>
          ) : (
            <form>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Departure Flight Number</FormLabel>
                  <Input
                    name="departureFlightNumber"
                    value={profile.departureFlightNumber}
                    onChange={handleInputChange}
                    isDisabled={isAlreadyThere}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Departure Date</FormLabel>
                  <Input
                    type="date"
                    name="departureDate"
                    value={profile.departureDate}
                    onChange={handleInputChange}
                    isDisabled={isAlreadyThere}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Arrival Flight Number</FormLabel>
                  <Input
                    name="arrivalFlightNumber"
                    value={profile.arrivalFlightNumber}
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
                <Flex justifyContent={"center"}>
                  <Button
                    fontSize={"sm"}
                    type="submit"
                    colorScheme="blue"
                    w="60%"
                  >
                    Save Changes
                  </Button>
                </Flex>
              </VStack>
            </form>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TicketDetails;
