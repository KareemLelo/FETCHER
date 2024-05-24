import React, { createContext, useContext, useState, useCallback } from "react";
// import { fetchQuests, updateQuest, updateFeesDeducted, updateVault } from "../Services/Api"; // Adjust the path to your API functions

interface OrderStatus {
  activeStep: number;
  statusIndex: number;
  progressIndex: number;
  isComplete: boolean;
  agreeStatusF: boolean;
  agreeStatusQM: boolean;
  canceledBy: string;
  vaultBalance: number;
  balanceQM: number;
  balanceF: number;
  systemBalance: number;
  servFee: number;
  commFee: number;
  feesDeducted: boolean;
  price: number;
  weight: number;
  quantity: number;
  alreadyThere: boolean;
  setAlreadyThere: (alreadyThere: boolean) => void;
  setPrice: (price: number) => void;
  setWeight: (weight: number) => void;
  setQuantity: (quantity: number) => void;
  setActiveStep: (step: number) => void;
  setStatusIndex: (index: number) => void;
  setProgressIndex: (index: number) => void;
  setComplete: (isComplete: boolean) => void;
  setAgreeStatusF: (status: boolean) => void;
  setAgreeStatusQM: (status: boolean) => void;
  setCanceledBy: (canceledBy: string) => void;
  setCommFee: (commFee: number) => void;
  setServFee: (servFee: number) => void;
  setVaultBalance: (vaultBalance: number) => void;
  setFeesDeducted: (status: boolean) => void;
  setBalanceQM: (balanceQM: number) => void;
  setBalanceF: (balanceF: number) => void;
  setSystemBalance: (systemBalance: number) => void; // Added setter
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
  const [alreadyThere, setAlreadyThere] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [isComplete, setComplete] = useState(false);
  const [agreeStatusF, setAgreeStatusF] = useState(false);
  const [agreeStatusQM, setAgreeStatusQM] = useState(false);
  const [canceledBy, setCanceledBy] = useState<string>("");
  let [vaultBalance, setVaultBalance] = useState(0);
  let [price, setPrice] = useState(0);
  let [weight, setWeight] = useState(0);
  let [quantity, setQuantity] = useState(0);
  const [balanceQM, setBalanceQM] = useState(1000); // example hardcoded value
  const [balanceF, setBalanceF] = useState(1000); // example hardcoded value
  const [systemBalance, setSystemBalance] = useState(0); // Added state
  const [servFee, setServFee] = useState(0);
  const [commFee, setCommFee] = useState(0);
  const [feesDeducted, setFeesDeducted] = useState(false);

  const handleSetAgreeStatusQM = useCallback((status: boolean) => {
    setAgreeStatusQM(status);
  }, []);

  const handleSetAlredyThere = useCallback((status: boolean) => {
    setAlreadyThere(status);
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

  const handleSetPrice = useCallback((index: number) => {
    setPrice(index);
  }, []);

  const handleSetQuantity = useCallback((index: number) => {
    setQuantity(index);
  }, []);

  const handleSetWeight = useCallback((index: number) => {
    setWeight(index);
  }, []);

  const handleSetCommFee = useCallback((commFee: number) => {
    setCommFee(commFee);
  }, []);

  const handleSetServFee = useCallback((servFee: number) => {
    setServFee(servFee);
  }, []);

  const handleSetVaultBalance = useCallback((vaultBalance: number) => {
    setVaultBalance(vaultBalance);
  }, []);

  const handleSetFeesDeducted = useCallback((feesDeducted: boolean) => {
    setFeesDeducted(feesDeducted);
  }, []);

  const handleSetProgressIndex = useCallback((index: number) => {
    setProgressIndex(index);
  }, []);
  const handleSetBalanceQM = useCallback((balanceQM: number) => {
    setBalanceQM(balanceQM);
  }, []);
  const handleSetBalanceF = useCallback((balanceF: number) => {
    setBalanceF(balanceF);
  }, []);

  const handleSetCanceledBy = useCallback((party: string) => {
    setCanceledBy(party);
  }, []);

  const handleSetSystemBalance = useCallback((systemBalance: number) => {
    setSystemBalance(systemBalance);
  }, []);

  return (
    <OrderStatusContext.Provider
      value={{
        alreadyThere,
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
        price,
        quantity,
        weight,
        setAlreadyThere: handleSetAlredyThere,
        setQuantity: handleSetQuantity,
        setWeight: handleSetWeight,
        setPrice: handleSetPrice,
        setActiveStep: handleSetActiveStep,
        setStatusIndex: handleSetStatusIndex,
        setProgressIndex: handleSetProgressIndex,
        setComplete: handleSetComplete,
        setAgreeStatusF: handleSetAgreeStatusF,
        setAgreeStatusQM: handleSetAgreeStatusQM,
        setCanceledBy: handleSetCanceledBy,
        setCommFee: handleSetCommFee,
        setServFee: handleSetServFee,
        setVaultBalance: handleSetVaultBalance,
        setFeesDeducted: handleSetFeesDeducted,
        setBalanceF: handleSetBalanceF,
        setBalanceQM: handleSetBalanceQM,
        setSystemBalance: handleSetSystemBalance, // Added setter
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  );
};
