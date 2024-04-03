// TrackOrderPage.tsx
import React from "react";
import { VStack } from "@chakra-ui/react";
import TrackOrder from "./TrackOrder";
import TrackOrderDesc from "./TrackOrderDesc";

const order = {
  id: "ABC123",
  name: "Custom Sneakers",
  price: "$200",
  estimatedDelivery: "2023-10-05",
};

const TrackOrderPage: React.FC = () => {
  return (
    <VStack align="stretch" maxWidth="full" m={6}>
      <TrackOrder order={order} />
      <TrackOrderDesc order={order} />
    </VStack>
  );
};

export default TrackOrderPage;
