import { useState, useEffect, FormEvent, ChangeEvent } from "react";
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
  Divider,
  Fade,
} from "@chakra-ui/react";
import { fetchPassportData, savePassportData } from "../../Services/Api"; // Adjust paths as necessary
import { Passport } from "../../Services/Interface";

const MyPassport = () => {
  const toast = useToast();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  /* const [passport, setPassport] = useState<Passport>({
    passportNumber: "",
    nationality: "",
    expirationDate: "",
  }); */

  const [passport, setPassport] = useState({
    passportNumber: "123456789",
    nationality: "Narnia",
    expirationDate: "2030-01-01",
  });

  const [passportSaved, setPassportSaved] = useState(true);

  // Load passport details on component mount
  /* useEffect(() => {
    const loadPassportDetails = async () => {
      try {
        const data = await fetchPassportData();
        if (data) {
          setPassport(data);
          setPassportSaved(true);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load passport details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    loadPassportDetails();
  }, [toast]); */

  /* const handlePassportSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await savePassportData(passport);
      setPassportSaved(true);
      toast({
        title: "Success",
        description: "Passport details saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save passport details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }; */

  const handlePassportSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Passport details saved successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setPassportSaved(true);
  };

  const updatePassportField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassport((prevPassport) => ({
      ...prevPassport,
      [name]: value,
    }));
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box
        bg={cardBg}
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        color={textColor}
        w="full"
        maxW="md"
      >
        <VStack spacing={6} align="stretch">
          <Heading size="lg" mb={2}>
            Passport Details
          </Heading>
          {!passportSaved ? (
            <Fade in={!passportSaved}>
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
                  <Button type="submit" colorScheme="teal" size="lg" w="full">
                    Save Passport Details
                  </Button>
                </VStack>
              </form>
            </Fade>
          ) : (
            <VStack spacing={4} align="stretch">
              <Text fontSize="md" fontWeight={"bold"}>
                Passport Number: {passport.passportNumber}
              </Text>
              <Text fontSize="md" fontWeight={"bold"}>
                Nationality: {passport.nationality}
              </Text>
              <Text fontSize="md" fontWeight={"bold"}>
                Expiration Date: {passport.expirationDate}
              </Text>
              <Button
                colorScheme="blue"
                onClick={() => setPassportSaved(false)}
                w="full"
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
