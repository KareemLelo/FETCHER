import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
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
  Flex,
  Fade,
  Avatar, // Added for the avatar
} from "@chakra-ui/react";
import { Passport } from "../../Services/Interface";

interface MyPassportProps {
  passportNumber: string;
  nationality: string;
  expirationDate: string;
}

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const MyPassport: React.FC<MyPassportProps> = ({
  passportNumber: initialPassportNumber,
  nationality: initialNationality,
  expirationDate: initialExpirationDate,
}) => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary"); // Adjusted to match ProfileInfo
  const textColor = useColorModeValue("brand.text", "white");

  // Initialize state with the initial props
  const [passport, setPassport] = useState<Passport>({
    passportNumber: initialPassportNumber,
    nationality: initialNationality,
    expirationDate: initialExpirationDate,
  });

  // Effect hook to update state when props change
  useEffect(() => {
    setPassport({
      passportNumber: initialPassportNumber,
      nationality: initialNationality,
      expirationDate: formatDate(initialExpirationDate),
    });
  }, [initialPassportNumber, initialNationality, initialExpirationDate]);

  const [editMode, setEditMode] = useState(false);

  const updatePassportField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassport((prevPassport) => ({
      ...prevPassport,
      [name]: value,
    }));
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
          <Heading size="xl">Passport Details</Heading>
          {editMode ? (
            <Fade in={editMode}>
              <form /* onSubmit={handlePassportSubmit} */>
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
                  <Flex justifyContent={"center"}>
                    <Button type="submit" colorScheme="teal" size="lg" w="60%">
                      Save Passport Details
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
