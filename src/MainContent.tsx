import Register from "./Components/Register";
import Login from "./Components/Login";
import QuestForm from "./Components/QuestMaker/QuestForm";
import QuestGrid from "./Components/Fetcher/HomeContentF";
import { useContent } from "./ContentContext";
import CreditCardGrid from "./Components/CreditCardGrid";
import TrackOrderPage from "./Components/QuestMaker/TrackOrderPage";
import HomeContentQM from "./Components/QuestMaker/HomeContentQM";
import MyProfilePage from "./Components/MyProfilePage";
import AvailableQuestPage from "./Components/Fetcher/AvailableQuestPage";

// Import other components as needed

const MainContent = () => {
  const { content } = useContent();

  switch (content) {
    case "Home":
      return <QuestGrid />;
    case "register":
      return <Register />;
    case "login":
      return <Login />;
    case "New Quest":
      return <QuestForm />;
    case "My Profile":
      return <MyProfilePage />;
    case "My Credit Card":
      return <CreditCardGrid />;
    case "Track My Order":
      return <TrackOrderPage />;
    case "Available Quests":
      return <AvailableQuestPage quests={[]} />;
    default:
      return (
        // Your default content or components
        <HomeContentQM />
      );
  }
};

export default MainContent;
