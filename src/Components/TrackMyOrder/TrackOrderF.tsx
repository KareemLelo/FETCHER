import {
  Box,
  Flex,
  Text,
  Icon,
  Divider,
  HStack,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaHome,
  FaRegHandshake,
} from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useOrderStatus } from "../../ContentManagment/OrderStatusContext";

// Define the steps for the fetcher's journey
const progressIndex = [
  {
    label: "Not traveled yet",
    actionLabel: "Start Travelling",
    icon: FaHome,
    colorScheme: "red",
  },
  {
    label: "Arriving at destination",
    actionLabel: "Confirm Arrival",
    icon: FaPlaneDeparture,
    colorScheme: "orange",
  },
  {
    label: "Contact QuestMaker",
    actionLabel: "Agree",
    icon: FaRegHandshake,
    colorScheme: "yellow",
  },
  {
    label: "Item Purchased",
    actionLabel: "Item Purchased",
    icon: MdShoppingCart,
    colorScheme: "green",
  },
  {
    label: "Flying Back",
    actionLabel: "Arrived",
    icon: FaPlaneArrival,
    colorScheme: "blue",
  },
  {
    label: "Quest Accomplished",
    actionLabel: "Complete",
    icon: BsFillCheckCircleFill,
    colorScheme: "purple",
  },
];

const TrackOrderF: React.FC<{ order: { id: string } }> = ({ order }) => {
  const {
    activeStep,
    statusIndex,
    setStatusIndex,
    setActiveStep,
    agreeStatusF,
    agreeStatusQM,
    setAgreeStatusF,
    setComplete,
    isComplete,
  } = useOrderStatus();
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");
  /* const today = new Date().toISOString().slice(0, 10); */ // Assuming the date format is YYYY-MM-DD

  // Check if current date matches the departure date
  /* const checkDepartureDate = (departureDate) => {
    return today === departureDate;
  }; */

  const buttonText = progressIndex[activeStep].actionLabel;

  const isOrderCancelled = statusIndex === 2;

  const advanceStep = () => {
    if (!isOrderCancelled) {
      if (activeStep === 2 && !agreeStatusF) {
        setAgreeStatusF(true);
        setActiveStep(activeStep + 1);
      } else if (activeStep < progressIndex.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        setComplete(true);
      }
    }
  };

  /* const handleAction = () => {
    // Here you could insert the logic to handle the different states
    // For demonstration, this just advances the step
    advanceStep();
  }; */

  return (
    <Box background={cardBg} p={5} rounded="md" shadow="lg" maxWidth="full">
      <Text fontWeight="bold" color={textColor} mb={4}>
        Order ID: {order.id}
      </Text>
      <Divider mb={4} />
      <VStack spacing={4}>
        {progressIndex.map((step, index) => (
          <Flex key={index} align="center" direction="column" w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Text fontSize="lg" color={textColor}>
                {step.label}
              </Text>
              <Icon
                as={step.icon}
                color={index <= activeStep ? step.colorScheme : "gray"}
                w={6}
                h={6}
              />
            </HStack>
            {index === activeStep && (
              <Button
                colorScheme={step.colorScheme}
                onClick={() => {
                  advanceStep();
                }}
                isDisabled={isComplete || (index === 2 && !agreeStatusQM)} // Disables the button unless QuestMaker has agreed
              >
                {buttonText}
              </Button>
            )}
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default TrackOrderF;
