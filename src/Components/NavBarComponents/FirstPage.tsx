import { useState } from "react";
import NavBar from "./NavBar";
import Login from "./Login"; // path to your Login component
import SignUp from "./SignUp"; // path to your SignUp component
import { Box } from "@chakra-ui/react";

const FirstPage = () => {
  const [showSignUp] = useState(false);

  // Render the appropriate component based on the state
  const renderMainContent = () => {
    if (showSignUp) {
      return <SignUp />;
    } else {
      return <Login />;
    }
  };

  return (
    <Box>
      <NavBar />
      {renderMainContent()}
    </Box>
  );
};

export default FirstPage;
