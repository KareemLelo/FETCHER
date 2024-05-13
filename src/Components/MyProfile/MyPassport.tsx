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

interface PassportUpdateData {
  passportNumber: string;
  nationality: string;
  expirationDate: string;
}

interface MyPassportProps extends PassportUpdateData {
  onSave: (data: PassportUpdateData) => void;
}

const MyPassport: React.FC<MyPassportProps> = ({
  passportNumber: initialPassportNumber,
  nationality: initialNationality,
  expirationDate: initialExpirationDate,
  onSave,
}) => {
  const toast = useToast();
  const cardBg = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("black", "white");

  // Initially determine if the user should be in edit mode
  const [editMode, setEditMode] = useState(false);

  // Initialize state with the initial props or default values
  const [passport, setPassport] = useState<PassportUpdateData>({
    passportNumber: initialPassportNumber || "",
    nationality: initialNationality || "",
    expirationDate: initialExpirationDate || "",
  });

  useEffect(() => {
    // Update the local state with the initial props from the parent component
    setPassport({
      passportNumber: initialPassportNumber,
      nationality: initialNationality,
      expirationDate: formatDate(initialExpirationDate),
    });
  }, [initialPassportNumber, initialNationality, initialExpirationDate]);

  // Handle changes in the input fields
  const updatePassportField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassport((prevPassport) => ({
      ...prevPassport,
      [name]: value,
    }));
  };

  // Handle the submission of the form
  const handlePassportSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      passportNumber: passport.passportNumber,
      nationality: passport.nationality,
      expirationDate: passport.expirationDate,
    });
    setEditMode(false); // Turn off edit mode after saving
    toast({
      title: "Passport Updated",
      description: "Your passport details have been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
          <Heading size="lg">Passport Details</Heading>
          {editMode ? (
            <Fade in={editMode}>
              <form onSubmit={handlePassportSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Passport Number</FormLabel>
                    <Input
                      name="passportNumber"
                      value={passport.passportNumber}
                      onChange={updatePassportField}
                      placeholder="Enter Passport Number"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Nationality</FormLabel>
                    <Input
                      name="nationality"
                      value={passport.nationality}
                      onChange={updatePassportField}
                      placeholder="Enter Nationality"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Expiration Date</FormLabel>
                    <Input
                      name="expirationDate"
                      value={passport.expirationDate}
                      onChange={updatePassportField}
                      type="date"
                    />
                  </FormControl>
                  <Flex justifyContent={"center"} w="60%">
                    <Button type="submit" colorScheme="teal">
                      Save Details
                    </Button>
                  </Flex>
                </VStack>
              </form>
            </Fade>
          ) : (
            <VStack spacing={5} align="stretch">
              <FormControl>
                <FormLabel>Passport Number</FormLabel>
                <Input
                  type="text"
                  name="passportNumber"
                  value={passport.passportNumber}
                  placeholder="Passport Number"
                  isReadOnly={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Nationality</FormLabel>
                <Input
                  type="text"
                  name="nationality"
                  value={passport.nationality}
                  placeholder="Nationality"
                  isReadOnly={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Expiration Date</FormLabel>
                <Input
                  type="text"
                  name="expirationDate"
                  value={passport.expirationDate}
                  placeholder="Expiration Date"
                  isReadOnly={true}
                />
              </FormControl>
              <Flex justifyContent={"center"}>
                <Button
                  colorScheme="blue"
                  onClick={() => setEditMode(true)}
                  w="60%"
                >
                  Edit Passport Details
                </Button>
              </Flex>
            </VStack>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default MyPassport;

function formatDate(dateString: string | number | Date) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
