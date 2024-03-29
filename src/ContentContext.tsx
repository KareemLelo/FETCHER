// ContentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContentContextType {
  content: string;
  accountType: string; // New state for managing account type
  setContent: (content: string) => void;
  setAccountType: (type: string) => void; // New setter for account type
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const [content, setContent] = useState<string>("default");
  const [accountType, setAccountType] = useState<string>(""); // Initialize accountType state

  return (
    <ContentContext.Provider
      value={{ content, setContent, accountType, setAccountType }}
    >
      {children}
    </ContentContext.Provider>
  );
};
