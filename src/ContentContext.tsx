// ContentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContentContextType {
  content: string;
  setContent: (content: string) => void;
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

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
};
