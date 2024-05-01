import React, { createContext, useContext, useState, useCallback } from "react";

interface OrderStatus {
  activeStep: number;
  isComplete: boolean;
  agreeStatusF: boolean;
  agreeStatusQM: boolean;
  setActiveStep: (step: number) => void;
  setComplete: (isComplete: boolean) => void;
  setAgreeStatusF: (status: boolean) => void;
  setAgreeStatusQM: (status: boolean) => void;
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
  const [isComplete, setComplete] = useState(false);
  const [agreeStatusF, setAgreeStatusF] = useState(false);
  const [agreeStatusQM, setAgreeStatusQM] = useState(false);

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

  return (
    <OrderStatusContext.Provider
      value={{
        activeStep,
        isComplete,
        agreeStatusF,
        agreeStatusQM,
        setActiveStep: handleSetActiveStep,
        setComplete: handleSetComplete,
        setAgreeStatusF: handleSetAgreeStatusF,
        setAgreeStatusQM: handleSetAgreeStatusQM,
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  );
};
