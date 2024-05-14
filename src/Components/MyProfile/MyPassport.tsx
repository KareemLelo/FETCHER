import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  Box,
  VStack,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Flex,
  Fade,
  Icon,
} from "@chakra-ui/react";
import { PassportUpdateData } from "../../Services/Interface";
import { EditIcon, CheckIcon, CalendarIcon } from "@chakra-ui/icons";
import { FaPassport, FaGlobeAmericas } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface MyPassportProps extends PassportUpdateData {
  onSave: (data: PassportUpdateData) => void;
}

const MyPassport: React.FC<MyPassportProps> = ({
  passportNumber: initialPassportNumber,
  nationality: initialNationality,
  expirationDate: initialExpirationDate,
  onSave,
}) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  const buttonColor = useColorModeValue("brand.accent", "teal");
  const inputBg = useColorModeValue("white", "gray.600");
  const buttonHoverBg = useColorModeValue("brand.primary", "teal.300");

  const [editMode, setEditMode] = useState(false);
  const [passport, setPassport] = useState({
    passportNumber: initialPassportNumber || "",
    nationality: initialNationality || "",
    expirationDate: initialExpirationDate || "",
  });

  useEffect(() => {
    setPassport({
      passportNumber: initialPassportNumber,
      nationality: initialNationality,
      expirationDate: formatDate(initialExpirationDate),
    });
  }, [initialPassportNumber, initialNationality, initialExpirationDate]);

  const updatePassportField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassport((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassportSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      passportNumber: passport.passportNumber,
      nationality: passport.nationality,
      expirationDate: passport.expirationDate,
    });
    setEditMode(false);
  };

  return (
    <Flex justifyContent={"center"} mt={5}>
      <MotionBox
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
        borderWidth="1px"
        borderColor={useColorModeValue("gray.300", "gray.600")}
      >
        <VStack spacing={4} align="stretch">
          <Heading size="lg">
            <Icon as={FaPassport} mr={2} /> Passport Details
          </Heading>
          {editMode ? (
            <Fade in={editMode}>
              <form onSubmit={handlePassportSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>
                      <Icon as={FaPassport} mr={2} /> Passport Number
                    </FormLabel>
                    <Input
                      name="passportNumber"
                      value={passport.passportNumber}
                      onChange={updatePassportField}
                      placeholder="Enter Passport Number"
                      bg={inputBg}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>
                      <Icon as={FaGlobeAmericas} mr={2} /> Nationality
                    </FormLabel>
                    <Input
                      name="nationality"
                      value={passport.nationality}
                      onChange={updatePassportField}
                      placeholder="Enter Nationality"
                      bg={inputBg}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>
                      <CalendarIcon mr={2} /> Expiration Date
                    </FormLabel>
                    <Input
                      type="date"
                      name="expirationDate"
                      value={passport.expirationDate}
                      onChange={updatePassportField}
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
                      <CheckIcon mr={2} /> Save Details
                    </MotionButton>
                  </Flex>
                </VStack>
              </form>
            </Fade>
          ) : (
            <VStack spacing={5} align="stretch">
              <FormControl>
                <FormLabel>
                  <Icon as={FaPassport} mr={2} /> Passport Number
                </FormLabel>
                <Input
                  type="text"
                  name="passportNumber"
                  value={passport.passportNumber}
                  isReadOnly={true}
                  bg={inputBg}
                />
              </FormControl>

              <FormControl>
                <FormLabel>
                  <Icon as={FaGlobeAmericas} mr={2} /> Nationality
                </FormLabel>
                <Input
                  type="text"
                  name="nationality"
                  value={passport.nationality}
                  isReadOnly={true}
                  bg={inputBg}
                />
              </FormControl>

              <FormControl>
                <FormLabel>
                  <CalendarIcon mr={2} /> Expiration Date
                </FormLabel>
                <Input
                  type="date"
                  name="expirationDate"
                  value={passport.expirationDate}
                  isReadOnly={true}
                  bg={inputBg}
                />
              </FormControl>
              <Flex justifyContent={"center"} mt={10} w="100%">
                <MotionButton
                  background={buttonColor}
                  onClick={() => setEditMode(true)}
                  w="70%"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  _hover={{ bg: buttonHoverBg }}
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

export default MyPassport;

function formatDate(dateString: string | number | Date) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
