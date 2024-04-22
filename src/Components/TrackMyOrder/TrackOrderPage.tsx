// TrackOrderPage.tsx
import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import TrackOrder from "./TrackOrder";
import TrackOrderDesc from "./TrackOrderDesc";
import Vault from "./Vault";

const order = {
  id: "ABC123",
  name: "Custom Sneakers",
  price: "$200",
  estimatedDelivery: "2023-10-05",
};

const transactions = [
  // Mock data for transaction history
  { id: "TXN123", amount: 50, date: "2023-01-01", description: "Service Fee" },
  // ... other transactions
];

const balance = 350; // Mock balance

const TrackOrderPage: React.FC = () => {
  return (
    <Flex justifyContent={"center"}>
      <VStack align="stretch" maxWidth="full" m={6} spacing={6} width={"80%"}>
        <TrackOrder order={order} />
        <TrackOrderDesc order={order} />
        <Vault balance={balance} transactions={transactions} />
      </VStack>
    </Flex>
  );
};

export default TrackOrderPage;
