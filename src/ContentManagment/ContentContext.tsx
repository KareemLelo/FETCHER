import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  accCategory: string;
}

interface ContentContextType {
  content: string;
  accountType: string;
  user: User | null;
  setContent: (content: string) => void;
  setAccountType: (type: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

export const ContentContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [content, setContent] = useState<string>("default");
  const [accountType, setAccountType] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("userId");
    setUser(null);
    setContent("default");
    setAccountType("");
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        accountType,
        setAccountType,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
