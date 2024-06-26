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
  Icon,
} from "@chakra-ui/react";
import { FlightUpdateData } from "../../Services/Interface";
import { motion } from "framer-motion";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { EditIcon, CheckIcon, CalendarIcon } from "@chakra-ui/icons";
import { fetchQuestByAcceptor } from "../../Services/Api"; // Import the API function
import { useOrderStatus } from "../../Hooks/OrderStatusContext";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface TicketDetailsProps {
  flightData: FlightUpdateData;
  onSave: (data: FlightUpdateData) => Promise<void>;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  flightData,
  onSave,
}) => {
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = "gray.600";
  const buttonColor = "brand.primary";
  const inputBg = useColorModeValue("white", "gray.600");
  const buttonHoverBg = "brand.hover";

  const [editMode, setEditMode] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const { setAlreadyThere } = useOrderStatus();
  const [ticket, setTicket] = useState<FlightUpdateData>({
    depFlightNumber: "",
    departureDate: "",
    arrFlightNumber: "",
    arrivalDate: "",
    alreadyThere: false,
  });

  useEffect(() => {
    console.log("Initial flightData:", flightData);
    setTicket({
      depFlightNumber: flightData.depFlightNumber || "",
      departureDate: formatDate(flightData.departureDate),
      arrFlightNumber: flightData.arrFlightNumber || "",
      arrivalDate: formatDate(flightData.arrivalDate),
      alreadyThere: flightData.alreadyThere || false,
    });
  }, [flightData]);

  useEffect(() => {
    const checkQuestStatus = async () => {
      try {
        console.log("Initial flightData:", flightData);
        const quest = await fetchQuestByAcceptor();
        if (quest) {
          console.log("Quest found:", quest);
          setFormDisabled(true);
        } else {
          console.log("No quest found for acceptor");
          setFormDisabled(false);
        }
        console.log("Updated ticket state:", {
          depFlightNumber: flightData.depFlightNumber || "",
          departureDate: formatDate(flightData.departureDate),
          arrFlightNumber: flightData.arrFlightNumber || "",
          arrivalDate: formatDate(flightData.arrivalDate),
          alreadyThere: flightData.alreadyThere || false,
        });
      } catch (error) {
        console.error("Error fetching quest by acceptor:", error);
        setFormDisabled(false);
      }
    };

    checkQuestStatus();
  }, [flightData]);

  const updateTicketField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTicketSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (ticket.departureDate) {
        const updatedData = {
          ...ticket,
          departureDate: new Date(ticket.departureDate).toISOString(),
          arrivalDate: new Date(ticket.arrivalDate).toISOString(),
        };
        await onSave(updatedData);
        setTicket(updatedData);
        setEditMode(false);
        toast({
          title: "Flight Details Updated",
          description: "Your flight details were successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const updatedData = {
          ...ticket,
          arrivalDate: new Date(ticket.arrivalDate).toISOString(),
        };
        await onSave(updatedData);
        setTicket(updatedData);
        setEditMode(false);
        toast({
          title: "Flight Details Updated",
          description: "Your flight details were successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
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

  const handleAlreadyThere = async () => {
    try {
      const updatedData = {
        ...ticket,
        alreadyThere: !ticket.alreadyThere,
      };

      await onSave(updatedData);
      setTicket((prev) => ({
        ...prev,
        alreadyThere: !prev.alreadyThere,
      }));
      if (updatedData.alreadyThere) {
        setAlreadyThere(true);
      } else {
        setAlreadyThere(false);
      }
      toast({
        title: "Update Successful",
        description: updatedData.alreadyThere
          ? "You have marked yourself as already there!"
          : "You have marked yourself as not yet there.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update your status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent={"center"} mt={5}>
      <MotionBox
        borderWidth="1px"
        borderColor={useColorModeValue("gray.300", "gray.600")}
        bg={cardBg}
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        color={textColor}
        width={{ base: "90%", md: "80%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <VStack spacing={4} align="stretch">
          <Heading size="lg">
            <Icon as={FaSuitcaseRolling} mr={2} /> Flight Details
          </Heading>
          <Flex justifyContent={"center"} w={"100%"}>
            <Button
              background={buttonColor}
              onClick={handleAlreadyThere}
              color={"white"}
              w="70%"
              isDisabled={formDisabled || !editMode}
              _hover={{ bg: buttonHoverBg }}
            >
              <FaPlaneArrival style={{ marginRight: 8 }} /> I'm Already There
            </Button>
          </Flex>
          {editMode ? (
            <Fade in={editMode}>
              <form onSubmit={handleTicketSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>
                      <Icon as={FaPlaneDeparture} /> Departure Flight Number
                    </FormLabel>
                    <Input
                      name="depFlightNumber"
                      value={ticket.depFlightNumber}
                      onChange={updateTicketField}
                      placeholder="Enter Departure Flight Number"
                      isDisabled={ticket.alreadyThere || formDisabled}
                      bg={inputBg}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>
                      <CalendarIcon mr={2} /> Departure Date
                    </FormLabel>
                    <Input
                      type="date"
                      name="departureDate"
                      value={ticket.departureDate}
                      onChange={updateTicketField}
                      isDisabled={ticket.alreadyThere || formDisabled}
                      bg={inputBg}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>
                      <Icon as={FaPlaneArrival} mr={2} /> Arrival Flight Number
                    </FormLabel>
                    <Input
                      name="arrFlightNumber"
                      value={ticket.arrFlightNumber}
                      onChange={updateTicketField}
                      placeholder="Enter Arrival Flight Number"
                      isDisabled={formDisabled}
                      bg={inputBg}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>
                      <CalendarIcon mr={2} /> Arrival Date
                    </FormLabel>
                    <Input
                      type="date"
                      name="arrivalDate"
                      value={ticket.arrivalDate}
                      onChange={updateTicketField}
                      isDisabled={formDisabled}
                      bg={inputBg}
                    />
                  </FormControl>
                  <Flex justifyContent={"center"} w="100%">
                    <MotionButton
                      type="submit"
                      background={buttonColor}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      _hover={{ bg: buttonHoverBg }}
                      color={"white"}
                    >
                      <CheckIcon mr={2} /> Save Changes
                    </MotionButton>
                  </Flex>
                </VStack>
              </form>
            </Fade>
          ) : (
            <VStack spacing={5} align="stretch">
              <FormControl>
                <FormLabel>
                  <FaPlaneDeparture style={{ marginRight: 8 }} /> Departure
                  Flight Number
                </FormLabel>
                <Input
                  type="text"
                  name="depFlightNumber"
                  value={ticket.depFlightNumber}
                  isReadOnly={true}
                  isDisabled={ticket.alreadyThere || formDisabled}
                  bg={inputBg}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <CalendarIcon mr={2} /> Departure Date
                </FormLabel>
                <Input
                  type="date"
                  name="departureDate"
                  value={ticket.departureDate}
                  isReadOnly={true}
                  isDisabled={ticket.alreadyThere || formDisabled}
                  bg={inputBg}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <FaPlaneArrival style={{ marginRight: 8 }} /> Arrival Flight
                  Number
                </FormLabel>
                <Input
                  type="text"
                  name="arrFlightNumber"
                  value={ticket.arrFlightNumber}
                  isReadOnly={true}
                  isDisabled={formDisabled}
                  bg={inputBg}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <CalendarIcon mr={2} /> Arrival Date
                </FormLabel>
                <Input
                  type="date"
                  name="arrivalDate"
                  value={ticket.arrivalDate}
                  isReadOnly={true}
                  isDisabled={formDisabled}
                  bg={inputBg}
                />
              </FormControl>
              <Flex justifyContent={"center"} mt={4} w={"100%"}>
                <MotionButton
                  background={buttonColor}
                  onClick={() => setEditMode(true)}
                  w="70%"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  _hover={{ bg: buttonHoverBg }}
                  isDisabled={formDisabled}
                  color={"white"}
                >
                  <EditIcon mr={2} /> Edit Details
                </MotionButton>
              </Flex>
            </VStack>
          )}
        </VStack>
      </MotionBox>
    </Flex>
  );
};

export default TicketDetails;

function formatDate(dateString: string | number | Date) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
