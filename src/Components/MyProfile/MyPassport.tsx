// MyPassport.tsx
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
  Flex,
} from "@chakra-ui/react";

interface Passport {
  passportNumber: string;
  nationality: string;
  expirationDate: string;
}

const MyPassport = () => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  // Initial state for the passport
  const [passport, setPassport] = useState<Passport>({
    passportNumber: "",
    nationality: "",
    expirationDate: "",
  });

  const [passportSaved, setPassportSaved] = useState(false);

  const handlePassportSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassportSaved(true);
    toast({
      title: "Passport details updated.",
      description: "Your passport details have been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // Send `passport` to the server for saving
  };

  const updatePassportField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassport((prevPassport) => ({
      ...prevPassport,
      [name]: value,
    }));
  };

  return (
    <Flex justifyContent={"center"}>
      <Box
        bg={cardBg}
        p={6}
        borderRadius="lg"
        boxShadow="md"
        color={textColor}
        width={{ base: "80%", md: "90%" }}
      >
        <VStack spacing={5} align="stretch">
          <Heading size="lg" mb={5}>
            Passport Details
          </Heading>
          {!passportSaved ? (
            <form onSubmit={handlePassportSubmit}>
              <VStack spacing={4}>
                {/* Passport fields here */}
                <FormControl isRequired>
                  <FormLabel>Passport Number</FormLabel>
                  <Input
                    name="passportNumber"
                    value={passport.passportNumber}
                    onChange={updatePassportField}
                    placeholder="Enter Passport Number"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Nationality</FormLabel>
                  <Input
                    name="nationality"
                    value={passport.nationality}
                    onChange={updatePassportField}
                    placeholder="Enter Nationality"
                    _placeholder={{ color: "white" }}
                    aria-label="Nationality"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>ExpirationDate</FormLabel>
                  <Input
                    name="expirationDate"
                    value={passport.expirationDate}
                    onChange={updatePassportField}
                    type="date"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  backgroundColor="brand.accent"
                  colorScheme="teal"
                  color="brand.text"
                >
                  Save Passport Details
                </Button>
              </VStack>
            </form>
          ) : (
            // If saved, display passport details
            <VStack spacing={3}>
              <Text fontSize="lg">
                <strong>Passport Number:</strong> {passport.passportNumber}
              </Text>
              <Text fontSize="lg">
                <strong>Nationality</strong> {passport.nationality}
              </Text>
              <Text fontSize="lg">
                <strong>Expiration Date</strong> {passport.expirationDate}
              </Text>
              {/* Display other passport details */}
              <Button
                colorScheme="blue"
                onClick={() => setPassportSaved(false)}
              >
                Edit Passport Details
              </Button>
            </VStack>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default MyPassport;
