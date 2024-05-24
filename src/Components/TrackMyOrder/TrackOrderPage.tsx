import React, { useEffect, useState } from "react";
import { Flex, VStack, Center, Text, Box, Button } from "@chakra-ui/react";
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
  getVaultByQuestId,
  createVaultEntry,
} from "../../Services/Api";
import { Order, VaultInfo } from "../../Services/Interface";
import { useOrderStatus } from "../../Hooks/OrderStatusContext";
import animationData from "../../assets/Animations/Animation - 1715875081645.json";

const TrackOrderPage: React.FC = () => {
  const {
    setActiveStep,
    setStatusIndex,
    setProgressIndex,
    setCommFee,
    setServFee,
    setVaultBalance,
    balanceF,
    balanceQM,
    setBalanceF,
    setBalanceQM,
    setFeesDeducted,
  } = useOrderStatus();
  const { accountType } = useContent();
  const [order, setOrder] = useState<Order | null>(null);
  const [vault, setVault] = useState<VaultInfo | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // State variable to trigger refresh

  const calculateFees = (price: number, weight: number, quantity: number) => {
    const newCommFee = quantity * weight * 3.3;
    const newServFee = (price * 0.5) / 5;
    const newVaultBalance = newCommFee + newServFee;

    // Update the state for consistency, though these might not be used directly in this function
    setCommFee(newCommFee);
    setServFee(newServFee);
    setVaultBalance(newVaultBalance);

    const newBalanceF = balanceF - newCommFee;
    const newBalanceQM = balanceQM - newServFee;
    setBalanceF(newBalanceF);
    setBalanceQM(newBalanceQM);

    setFeesDeducted(true);

    return { newCommFee, newServFee, newVaultBalance };
  };

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

        let vaultData = await getVaultByQuestId(fetchedQuest._id);
        if (!vaultData) {
          const { newCommFee, newServFee, newVaultBalance } = calculateFees(
            fetchedQuest.itemPrice,
            fetchedQuest.itemWeight,
            fetchedQuest.itemQuantity
          );
          // Create vault if it doesn't exist
          const createdVault = await createVaultEntry({
            questId: fetchedQuest._id,
            vaultBalance: newVaultBalance,
            commitmentFee: newCommFee,
            serviceFee: newServFee,
            feesDeducted: true,
          });
          setVault(createdVault);
          console.log("Vault created for quest:", createdVault);
        } else {
          setVault(vaultData);
          console.log("Vault already exists for quest:", vaultData);
        }
      }
    } catch (error) {
      console.error("Error loading quest data:", error);
    }
  };

  useEffect(() => {
    loadQuestData();
  }, [accountType, setStatusIndex, setActiveStep, refreshKey]); // Add refreshKey to dependencies

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1); // Update state to trigger refresh
  };

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
        <Box
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, #6a11cb 30%, #2575fc 70%)"
          bgClip="text"
          marginBottom="8px"
        >
          No Orders Available
        </Box>
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
          <TrackOrderQM order={order} onAgree={handleRefresh} /> // Pass handleRefresh to TrackOrderQM
        ) : (
          <TrackOrderF order={order} />
        )}
        <TrackOrderDesc order={order} />
        {vault && <Vault vault={vault} />}
      </VStack>
    </Flex>
  );
};

export default TrackOrderPage;
