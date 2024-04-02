import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/poppins";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import MainContent from "./MainContent";
import { ContentProvider } from "./ContentContext";

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
            <GridItem
              area={"main"}
              maxWidth="100%"
              overflow="auto"
              maxHeight={"100%"}
            >
              <MainContent />
            </GridItem>
          </Grid>
        </div>
      </ContentProvider>
    </>
  );
}

export default App;
