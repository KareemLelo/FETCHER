import React, { useEffect, useState } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import TrackOrderF from "./TrackOrderF";
import TrackOrderDesc from "./TrackOrderDesc";
import Vault from "./Vault";
import { useContent } from "../../Hooks/ContentContext";
import TrackOrderQM from "./TrackOrderQM";
import {
  fetchQuestByCreatorTrackOrder,
  fetchQuestByAcceptor,
} from "../../Services/Api";
import { Order } from "../../Services/Interface"; // Assuming interfaces are exported from here
import { useOrderStatus } from "../../Hooks/OrderStatusContext";

const TrackOrderPage: React.FC = () => {
  const { setActiveStep, setStatusIndex, setProgressIndex } = useOrderStatus();
  const { accountType } = useContent();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadQuestData = async () => {
      try {
        let fetchedQuest = null;
        if (accountType === "QuestMaker") {
          fetchedQuest = await fetchQuestByCreatorTrackOrder();
        } else if (accountType === "Fetcher") {
          fetchedQuest = await fetchQuestByAcceptor();
        }

        if (fetchedQuest) {
          console.log("Initial quest data fetched:", fetchedQuest);
          const transformedQuest = {
            id: fetchedQuest._id,
            name: fetchedQuest.itemName,
            price: `$${fetchedQuest.itemPrice.toFixed(2)}`,
            quantity: fetchedQuest.itemQuantity,
            weight: fetchedQuest.itemWeight,
            direction: fetchedQuest.itemDirection,
            category: fetchedQuest.itemCategory,
          };
          setOrder(transformedQuest);

          // Initialize context with fetched quest statusIndex and other details
          setStatusIndex(fetchedQuest.statusIndex);
          setProgressIndex(fetchedQuest.progressIndex);
          setActiveStep(fetchedQuest.progressIndex); // Ensure this is correctly named
          console.log(
            `Context initialized with statusIndex: ${fetchedQuest.statusIndex}, progressIndex: ${fetchedQuest.progressIndex}`
          );
        }
      } catch (error) {
        console.error("Error loading quest data:", error);
      }
    };

    loadQuestData();
  }, [accountType, setStatusIndex, setActiveStep]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Flex justifyContent={"center"}>
      <VStack align="stretch" maxWidth="full" m={6} spacing={6} width={"80%"}>
        {accountType === "QuestMaker" ? (
          <TrackOrderQM order={order} />
        ) : (
          <TrackOrderF order={order} />
        )}
        <TrackOrderDesc order={order} />
        <Vault
          balance={200}
          transactions={[
            {
              id: "TXN456",
              amount: 75,
              date: "2023-09-05",
              description: "Initial Deposit",
            },
          ]}
        />
      </VStack>
    </Flex>
  );
};

export default TrackOrderPage;
