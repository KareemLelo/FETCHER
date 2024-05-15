import { Box } from "@chakra-ui/react";
import SideBar from "./Components/SideBar";
import { useContent } from "./Hooks/ContentContext";

const SidebarAppear: React.FC = () => {
  const { accountType } = useContent();

  // Render different components based on the account type and content state
  const renderContent = () => {
    // This will handle undefined content state, showing home based on role
    if (accountType === "Fetcher") {
      return <SideBar />;
    } else if (accountType === "QuestMaker") {
      return <SideBar />;
    }
  };

  return <Box h="100vh">{renderContent()}</Box>;
};

export default SidebarAppear;
