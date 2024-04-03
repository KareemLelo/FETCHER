import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/poppins";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
/* import CreditCardGrid from "./Components/CreditCardGrid";
import QuestGrid from "./Components/Fetcher/QuestCardGrid";

import Login from "./Components/Login";
import Register from "./Components/Register";
import QuestListGrid from "./Components/Fetcher/QuestListGrid";
import MyProfile from "./Components/MyProfile";
import QuestForm from "./Components/QuestMaker/QuestFrom"; */
import MainContent from "./MainContent";
import { ContentProvider } from "./ContentContext";

import TrackOrder from "./Components/QuestMaker/TrackOrder";
import TrackOrderPage from "./Components/QuestMaker/TrackOrderPage";

function App() {
  return (
    <>
      <ContentProvider>
        <div>
          <Grid
            templateAreas={{
              base: `"nav" "main"`,
              md: `"nav nav" "aside main"`,
            }}
            templateColumns={{
              base: "1fr",
              md: "400px 1fr",
            }}
            backgroundColor={"white"}
          >
            <GridItem area={"nav"}>
              <NavBar />
            </GridItem>
            <GridItem
              area={"aside"}
              display={{ base: "none", md: "block" }} // This line controls the visibility based on the breakpoint
            >
              <SideBar />
            </GridItem>
            <GridItem area={"main"} maxWidth="100%" overflow="auto">
              <MainContent />
            </GridItem>
          </Grid>
        </div>
      </ContentProvider>
    </>
  );
}

export default App;
