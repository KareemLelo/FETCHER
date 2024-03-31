// TrackOrderDesc.tsx
import React from "react";
import { Box, Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const TrackOrderDesc: React.FC<{
  order: {
    id?: string;
    name: string;
    price: string;
    estimatedDelivery: string;
  };
}> = ({ order }) => {
  const cardBg = useColorModeValue("brand.background", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");

  return (
    <Box background={cardBg} p={5} shadow="lg" maxWidth="full" mt={-10}>
      <Text fontWeight="bold" color={textColor} mb={2}>
        Order Summary
      </Text>
      <Divider mb={4} />
      <Flex direction="column">
        <Text color={textColor}>Item: {order.name}</Text>
        <Divider mb={3} />
        <Text color={textColor}>Price: {order.price}</Text>
        <Divider mb={3} />
        <Text color={textColor}>
          Estimated Delivery: {order.estimatedDelivery}
        </Text>
        <Divider mb={2} />
      </Flex>
    </Box>
  );
};

export default TrackOrderDesc;
