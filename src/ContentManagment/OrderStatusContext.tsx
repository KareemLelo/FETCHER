import React, { createContext, useContext, useState, useCallback } from "react";

interface OrderStatus {
  activeStep: number;
  isComplete: boolean;
  agreeStatus: boolean;
  setActiveStep: (step: number) => void;
  setComplete: (isComplete: boolean) => void;
  setAgreeStatus: (status: boolean) => void;
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
  const [agreeStatus, setAgreeStatus] = useState(false);

  const handleSetAgreeStatus = useCallback((status: boolean) => {
    setAgreeStatus(status);
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
        agreeStatus,
        setActiveStep: handleSetActiveStep,
        setComplete: handleSetComplete,
        setAgreeStatus: handleSetAgreeStatus,
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  );
};
