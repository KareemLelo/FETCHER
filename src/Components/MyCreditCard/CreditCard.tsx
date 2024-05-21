import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import {
  FaRegCreditCard,
  FaUser,
  FaCalendarAlt,
  FaLock,
  FaWifi,
} from "react-icons/fa";
import { CreditInfo } from "./CreditCardForm"; // Adjust the import path as necessary

interface Props {
  creditCard: CreditInfo;
}

const CreditCard = ({ creditCard }: Props) => {
  const cardBg = "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"; // Updated gradient background
  const textColor = "white";
  const iconColor = "whiteAlpha.900";

  return (
    <Box position="relative" p={6} width="340px" height="fit-content">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgSize="cover"
        bgPosition="center"
        opacity={0.7}
        borderRadius="lg"
        zIndex={-1}
      />

      <Flex
        bg={cardBg}
        color={textColor}
        p={6}
        borderRadius="lg"
        flexDirection="column"
        justifyContent="space-between"
        boxShadow="xl"
        width="100%"
        height="100%"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        transform="scale(1)"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="sm" fontWeight="bold">
            {creditCard.holderName}
          </Heading>
          <HStack spacing={1}>
            <Text fontSize="md">VISA</Text>
            <Icon as={FaWifi} boxSize={4} color={iconColor} />
          </HStack>
        </Flex>

        <Box my={4}>
          <Text fontSize="lg" letterSpacing="0.1em">
            {creditCard.cardNumber}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <VStack spacing={1} alignItems="flex-start">
            <HStack spacing={2}>
              <Icon as={FaCalendarAlt} boxSize={4} color={iconColor} />
              <Text fontSize="sm">{creditCard.expirationDate}</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaLock} boxSize={4} color={iconColor} />
              <Text fontSize="sm">{creditCard.CVV}</Text>
            </HStack>
          </VStack>
          <Icon as={FaUser} boxSize={8} color={iconColor} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default CreditCard;
