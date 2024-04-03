// MainContent.jsx

import Register from "./Components/Register";
import Login from "./Components/Login";
import QuestForm from "./Components/QuestMaker/QuestForm";
import QuestGrid from "./Components/Fetcher/QuestCardGrid";
import { useContent } from "./ContentContext";
import MyProfile from "./Components/MyProfile";
import CreditCardGrid from "./Components/CreditCardGrid";
import TrackOrderPage from "./Components/QuestMaker/TrackOrderPage";

// Import other components as needed

const MainContent = () => {
  const { content } = useContent();

  switch (content) {
    case "register":
      return <Register />;
    case "login":
      return <Login />;
    case "New Quest":
      return <QuestForm />;
    case "My Profile":
      return <MyProfile />;
    case "My Credit Card":
      return <CreditCardGrid />;
    case "Track My Order":
      return <TrackOrderPage />;
    default:
      return (
        // Your default content or components
        <QuestGrid />
      );
  }
};

export default MainContent;
