import React, { useEffect, useState } from "react";
import {
  Flex,
  VStack,
  Center,
  Heading,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import TrackOrderF from "./TrackOrderF";
import TrackOrderDesc from "./TrackOrderDesc";
import Vault from "./Vault";
import { useContent } from "../../Hooks/ContentContext";
import TrackOrderQM from "./TrackOrderQM";
import {
  fetchQuestByCreatorTrackOrder,
  fetchQuestByAcceptor,
} from "../../Services/Api";
import { Order } from "../../Services/Interface";
import { useOrderStatus } from "../../Hooks/OrderStatusContext";
import animationData from "../../assets/Animations/Animation - 1715875081645.json";

const TrackOrderPage: React.FC = () => {
  const {
    setActiveStep,
    setStatusIndex,
    setProgressIndex,
    commFee,
    servFee,
    vaultBalance,
    canceledBy,
  } = useOrderStatus();
  const { accountType } = useContent();
  const [order, setOrder] = useState<Order>();

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
          price: fetchedQuest.itemPrice,
          quantity: fetchedQuest.itemQuantity,
          weight: fetchedQuest.itemWeight,
          direction: fetchedQuest.itemDirection,
          category: fetchedQuest.itemCategory,
        };
        setOrder(transformedQuest);

        setStatusIndex(fetchedQuest.statusIndex);
        setProgressIndex(fetchedQuest.progressIndex);
        setActiveStep(fetchedQuest.progressIndex);
        console.log(
          `Context initialized with statusIndex: ${fetchedQuest.statusIndex}, progressIndex: ${fetchedQuest.progressIndex}`
        );
      }
    } catch (error) {
      console.error("Error loading quest data:", error);
    }
  };

  useEffect(() => {
    loadQuestData();
  }, [accountType, setStatusIndex, setActiveStep]);

  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  if (!order) {
    return (
      <Center minHeight="60vh" flexDirection="column">
        <MotionBox
          height="300px"
          width="300px"
          animate={{ scale: 1.1 }}
          transition={{ duration: 1, yoyo: Infinity }}
        >
          <Lottie animationData={animationData} loop autoplay />
        </MotionBox>
        <Heading size="lg" marginBottom="8px">
          No Orders Available
        </Heading>
        <Text fontSize="lg" marginBottom="16px">
          It looks like there are no available orders right now.
        </Text>
        <MotionButton
          colorScheme="blue"
          onClick={() =>
            setTimeout(() => {
              loadQuestData();
            }, 2100)
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refresh
        </MotionButton>
      </Center>
    );
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
          questId={order.id}
          commitmentFee={commFee}
          serviceFee={servFee}
          vaultBalance={vaultBalance}
          canceledBy={canceledBy}
        />
      </VStack>
    </Flex>
  );
};

export default TrackOrderPage;
