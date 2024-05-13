import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
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
  Fade,
} from "@chakra-ui/react";
import { FlightUpdateData } from "../../Services/Interface";

interface TicketDetailsProps {
  flightData: FlightUpdateData;
  onSave: (data: FlightUpdateData) => Promise<void>;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  flightData,
  onSave,
}) => {
  const toast = useToast();
  const cardBg = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("black", "white");

  const [editMode, setEditMode] = useState(false);
  const [ticket, setTicket] = useState<FlightUpdateData>(flightData);

  useEffect(() => {
    console.log("TicketDetails received new flightData:", flightData);
    setTicket({
      depFlightNumber: flightData.depFlightNumber || "",
      departureDate: formatDate(flightData.departureDate),
      arrFlightNumber: flightData.arrFlightNumber || "",
      arrivalDate: formatDate(flightData.arrivalDate),
      alreadyThere: flightData.alreadyThere,
    });
  }, [flightData]);

  const updateTicketField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleTicketSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...ticket,
        departureDate: new Date(ticket.departureDate).toISOString(),
        arrivalDate: new Date(ticket.arrivalDate).toISOString(),
      };

      await onSave(updatedData);
      setTicket(updatedData); // Update the local view immediately
      setEditMode(false);
      toast({
        title: "Flight Details Updated",
        description: "Your flight details have been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error saving flight details:", error);
      toast({
        title: "Error",
        description: "Failed to update flight details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent={"center"} mt={5}>
      <Box
        bg={cardBg}
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        color={textColor}
        width={{ base: "90%", md: "80%" }}
      >
        <VStack spacing={4} align="stretch">
          <Heading size="lg">Flight Details</Heading>
          {editMode ? (
            <Fade in={editMode}>
              <form onSubmit={handleTicketSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Departure Flight Number</FormLabel>
                    <Input
                      name="depFlightNumber"
                      value={ticket.depFlightNumber}
                      onChange={updateTicketField}
                      placeholder="Enter Departure Flight Number"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Departure Date</FormLabel>
                    <Input
                      type="date"
                      name="departureDate"
                      value={ticket.departureDate}
                      onChange={updateTicketField}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Arrival Flight Number</FormLabel>
                    <Input
                      name="arrFlightNumber"
                      value={ticket.arrFlightNumber}
                      onChange={updateTicketField}
                      placeholder="Enter Arrival Flight Number"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Arrival Date</FormLabel>
                    <Input
                      type="date"
                      name="arrivalDate"
                      value={ticket.arrivalDate}
                      onChange={updateTicketField}
                    />
                  </FormControl>
                  <Flex justifyContent={"center"} w="60%">
                    <Button type="submit" colorScheme="teal">
                      Save Changes
                    </Button>
                  </Flex>
                </VStack>
              </form>
            </Fade>
          ) : (
            <VStack spacing={5} align="stretch">
              <FormControl>
                <FormLabel>Departure Flight Number</FormLabel>
                <Input
                  type="text"
                  name="depFlightNumber"
                  value={ticket.depFlightNumber}
                  isReadOnly={true}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Departure Date</FormLabel>
                <Input
                  type="date"
                  name="departureDate"
                  value={ticket.departureDate}
                  isReadOnly={true}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Arrival Flight Number</FormLabel>
                <Input
                  type="text"
                  name="arrFlightNumber"
                  value={ticket.arrFlightNumber}
                  isReadOnly={true}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Arrival Date</FormLabel>
                <Input
                  type="date"
                  name="arrivalDate"
                  value={ticket.arrivalDate}
                  isReadOnly={true}
                />
              </FormControl>
              <Flex justifyContent={"center"}>
                <Button
                  colorScheme="blue"
                  onClick={() => setEditMode(true)}
                  w="60%"
                >
                  Edit Details
                </Button>
              </Flex>
            </VStack>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TicketDetails;

function formatDate(dateString: string | number | Date) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
