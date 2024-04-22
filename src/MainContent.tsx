import React from "react";
import { useContent } from "./ContentContext"; // Ensure the path is correct
import HomeContentF from "./Components/Fetcher/HomeContentF";
import HomeContentQM from "./Components/QuestMaker/HomeContentQM";
import Register from "./Components/Register";
import Login from "./Components/Login";
import QuestForm from "./Components/QuestMaker/QuestForm";
import MyProfilePage from "./Components/MyProfile/MyProfilePage";
import TrackOrderPage from "./Components/TrackMyOrder/TrackOrderPage";
import AvailableQuestPage from "./Components/AvailableQuests/AvailableQuestPage";
import CreditCardGrid from "./Components/MyCreditCard/CreditCardPage";

const MainContent: React.FC = () => {
  const { content, accountType } = useContent();

  // Render different components based on the account type and content state
  const renderContent = () => {
    switch (content) {
      case "Home":
        return <HomeContentF />;
      case "register":
        return <Register />;
      case "login":
        return <Login />;
      case "New Quest":
        return <QuestForm />;
      case "My Profile":
        return <MyProfilePage />;
      case "Track My Order":
        return <TrackOrderPage />;
      case "Available Quests":
        return <AvailableQuestPage quests={[]} />;
      case "My Credit Card":
        return <CreditCardGrid />;
      default:
        // This will handle undefined content state, showing home based on role
        return accountType === "Fetcher" ? <HomeContentF /> : <HomeContentQM />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default MainContent;
