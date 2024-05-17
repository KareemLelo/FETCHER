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
  const textColor = useColorModeValue("gray.700", "white");
  const buttonColor = useColorModeValue("brand.accent", "teal");
  const inputBg = useColorModeValue("white", "gray.600");
  const buttonHoverBg = useColorModeValue("brand.primary", "teal.300");
  const buttonHover = useColorModeValue("brand.accent", "teal.300");

  const [editMode, setEditMode] = useState(false);
  const [ticket, setTicket] = useState<FlightUpdateData>(flightData);
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    const checkQuestStatus = async () => {
      try {
        const quest = await fetchQuestByAcceptor();
        if (quest) {
          setFormDisabled(true);
          setTicket({
            depFlightNumber: flightData.depFlightNumber || "",
            departureDate: formatDate(flightData.departureDate),
            arrFlightNumber: flightData.arrFlightNumber || "",
            arrivalDate: formatDate(flightData.arrivalDate),
            alreadyThere: flightData.alreadyThere || false,
          });
        } else {
          setFormDisabled(false);
          setTicket({
            depFlightNumber: "",
            departureDate: "",
            arrFlightNumber: "",
            arrivalDate: "",
            alreadyThere: flightData.alreadyThere || false,
          });
        }
      } catch (error) {
        console.error("Error fetching quest by acceptor:", error);
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
      const updatedData = {
        ...ticket,
        departureDate: new Date(ticket.departureDate).toISOString(),
        arrivalDate: new Date(ticket.arrivalDate).toISOString(),
      };

      await onSave(updatedData);
      setTicket(updatedData);
      setEditMode(false);
      setDetailsSaved(true);
      toast({
        title: "Flight Details Updated",
        description: "Your flight details were successfully updated.",
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

  const handleAlreadyThere = async () => {
    try {
      const updatedData = {
        ...ticket,
        alreadyThere: true,
      };

      await onSave(updatedData);
      setTicket(updatedData);
      toast({
        title: "Update Successful",
        description: "You have marked yourself as already there!",
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
              background="brand.primary"
              onClick={handleAlreadyThere}
              w="70%"
              isDisabled={ticket.alreadyThere || !editMode}
              _hover={{ bg: buttonHover }}
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
                      <Icon as={FaPlaneDeparture} mr={2} /> Departure Flight
                      Number
                    </FormLabel>
                    <Input
                      name="depFlightNumber"
                      value={ticket.depFlightNumber}
                      onChange={updateTicketField}
                      placeholder="Enter Departure Flight Number"
                      isDisabled={formDisabled || flightData.alreadyThere}
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
                      isDisabled={formDisabled || flightData.alreadyThere}
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
                  isDisabled={ticket.alreadyThere || formDisabled}
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
                  isDisabled={ticket.alreadyThere || formDisabled}
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
