import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
//import { fetchQuests, updateQuest, updateFeesDeducted, updateVault } from "../Services/Api"; // Adjust the path to your API functions

interface OrderStatus {
  activeStep: number;
  statusIndex: number;
  progressIndex: number;
  isComplete: boolean;
  agreeStatusF: boolean;
  agreeStatusQM: boolean;
  canceledBy: string | null;
  vaultBalance: number;
  balanceQM: number;
  balanceF: number;
  systemBalance: number;
  servFee: number;
  commFee: number;
  feesDeducted: boolean;
  setActiveStep: (step: number) => void;
  setStatusIndex: (index: number) => void;
  setProgressIndex: (index: number) => void;
  setComplete: (isComplete: boolean) => void;
  setAgreeStatusF: (status: boolean) => void;
  setAgreeStatusQM: (status: boolean) => void;
  setCanceledBy: (canceledBy: string | null) => void;
  calculateFees: (
    quantity: number,
    weight: number,
    price: number
  ) => Promise<void>;
  handleQuestStatusChange: (
    quantity: number,
    weight: number,
    price: number
  ) => Promise<void>;
}

const OrderStatusContext = createContext<OrderStatus | undefined>(undefined);

export const useOrderStatus = () => {
  const context = useContext(OrderStatusContext);
  if (!context) {
    throw new Error(
      "useOrderStatus must be used within an OrderStatusProvider"
    );
  }
  return context;
};

export const OrderStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [isComplete, setComplete] = useState(false);
  const [agreeStatusF, setAgreeStatusF] = useState(false);
  const [agreeStatusQM, setAgreeStatusQM] = useState(false);
  const [canceledBy, setCanceledBy] = useState<string | null>(null);
  const [vaultBalance, setVaultBalance] = useState(0);
  const [balanceQM, setBalanceQM] = useState(100); // example hardcoded value
  const [balanceF, setBalanceF] = useState(100); // example hardcoded value
  const [systemBalance, setSystemBalance] = useState(0);
  const [servFee, setServFee] = useState(0);
  const [commFee, setCommFee] = useState(0);
  const [feesDeducted, setFeesDeducted] = useState(false);

  const handleSetAgreeStatusQM = useCallback((status: boolean) => {
    setAgreeStatusQM(status);
  }, []);

  const handleSetAgreeStatusF = useCallback((status: boolean) => {
    setAgreeStatusF(status);
  }, []);

  const handleSetComplete = useCallback((isComplete: boolean) => {
    setComplete(isComplete);
  }, []);

  const handleSetActiveStep = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  const handleSetStatusIndex = useCallback((index: number) => {
    setStatusIndex(index);
  }, []);

  const handleSetProgressIndex = useCallback((index: number) => {
    setProgressIndex(index);
  }, []);

  const handleSetCanceledBy = useCallback((party: string | null) => {
    setCanceledBy(party);
  }, []);

  const calculateFees = async (
    quantity: number,
    weight: number,
    price: number
  ) => {
    const newCommFee = quantity * weight * 0.1; // example calculation
    const newServFee = price * 0.05; // example calculation
    setCommFee(newCommFee);
    setServFee(newServFee);

    //await updateVault({ commFee: newCommFee, servFee: newServFee }); // Save in the Vault collection
  };

  const handleQuestStatusChange = async (
    quantity: number,
    weight: number,
    price: number
  ) => {
    await calculateFees(quantity, weight, price);

    switch (true) {
      case statusIndex === 1 && progressIndex === 0 && !feesDeducted:
        setBalanceF((prevBalance) => prevBalance - commFee);
        setBalanceQM((prevBalance) => prevBalance - servFee);
        setVaultBalance((prevBalance) => prevBalance + commFee + servFee);
        setFeesDeducted(true);
        //await updateFeesDeducted(true);
        break;

      case statusIndex === 3 && progressIndex === 5:
        setVaultBalance(
          (prevBalance) => prevBalance - price - servFee - commFee
        );
        setBalanceF(
          (prevBalance) => prevBalance + price + commFee + 0.5 * servFee
        );
        setSystemBalance((prevBalance) => prevBalance + 0.5 * servFee);
        break;

      case statusIndex === 2 && canceledBy !== null:
        handleCancelCases();
        break;

      default:
        break;
    }
  };

  const handleCancelCases = () => {
    switch (true) {
      case progressIndex === 0 &&
        (canceledBy === "QuestMaker" || canceledBy === "Fetcher"):
        setVaultBalance((prevBalance) => prevBalance - (commFee + servFee));
        setBalanceF((prevBalance) => prevBalance + commFee);
        setBalanceQM((prevBalance) => prevBalance + servFee);
        break;

      case progressIndex === 1 && canceledBy === "QuestMaker":
        setVaultBalance((prevBalance) => prevBalance - commFee - servFee);
        setBalanceF((prevBalance) => prevBalance + commFee + 0.25 * servFee);
        setSystemBalance((prevBalance) => prevBalance + 0.75 * servFee);
        break;

      case progressIndex === 1 && canceledBy === "Fetcher":
        setVaultBalance((prevBalance) => prevBalance - commFee - servFee);
        setBalanceQM((prevBalance) => prevBalance + servFee);
        setSystemBalance((prevBalance) => prevBalance + commFee);
        break;

      case progressIndex === 2 && canceledBy === "QuestMaker":
        setVaultBalance((prevBalance) => prevBalance - commFee - servFee);
        setBalanceF((prevBalance) => prevBalance + commFee + 0.5 * servFee);
        setSystemBalance((prevBalance) => prevBalance + 0.5 * servFee);
        break;

      case progressIndex === 4 && canceledBy === "Fetcher":
        //setVaultBalance(prevBalance => prevBalance - (price + commFee + servFee));
        //setBalanceQM(prevBalance => prevBalance + price + servFee);
        setSystemBalance((prevBalance) => prevBalance + commFee);
        break;

      default:
        break;
    }

    // Save updated values to the database
    /* //updateQuest({
      vaultBalance,
      balanceQM,
      balanceF,
      systemBalance,
    }); */
  };

  /* useEffect(() => {
    const fetchInitialData = async () => {
      try {
        //const quest = await fetchQuest();
        //setFeesDeducted(quest.feesDeducted);
        // Other initial data fetches and state updates
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []); */

  return (
    <OrderStatusContext.Provider
      value={{
        activeStep,
        statusIndex,
        progressIndex,
        isComplete,
        agreeStatusF,
        agreeStatusQM,
        canceledBy,
        vaultBalance,
        balanceQM,
        balanceF,
        systemBalance,
        servFee,
        commFee,
        feesDeducted,
        setActiveStep: handleSetActiveStep,
        setStatusIndex: handleSetStatusIndex,
        setProgressIndex: handleSetProgressIndex,
        setComplete: handleSetComplete,
        setAgreeStatusF: handleSetAgreeStatusF,
        setAgreeStatusQM: handleSetAgreeStatusQM,
        setCanceledBy: handleSetCanceledBy,
        calculateFees,
        handleQuestStatusChange,
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  );
};
