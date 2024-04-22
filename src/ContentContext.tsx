import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface User {
  username: string;
  role: string; // Assuming roles like 'QuestMaker' or 'Fetcher'
}

interface ContentContextType {
  content: string;
  accountType: string;
  user: User | null; // Added to manage user data
  setContent: (content: string) => void;
  setAccountType: (type: string) => void;
  setUser: (user: User | null) => void; // Function to update the current user
  logout: () => void; // Function to handle logout
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
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
  const [accountType, setAccountType] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const logout = useCallback(() => {
    // Reset user to null to represent a logged-out state
    setUser(null);
    setContent("default"); // Optionally reset content state
    setAccountType(""); // Optionally reset account type
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
