import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/poppins"; // Ensure Poppins font is applied globally in your index.css or Chakra theme
import NavBar from "./Components/NavBar";
import MainContent from "./Hooks/MainContent";
import { ContentContextProvider } from "./Hooks/ContentContext";
import SidebarAppear from "./SidebarAppear";
import { OrderStatusProvider } from "./Hooks/OrderStatusContext";

function App() {
  return (
    <>
      <ContentContextProvider>
        <OrderStatusProvider>
          <Grid
            h="100vh" // Ensure the grid takes full viewport height if necessary
            templateAreas={{
              base: `"nav" "main"`,
              md: `"nav nav" "aside main"`,
            }}
            templateColumns={{
              base: "1fr",
              md: "250px 1fr",
            }}
            gap="2" // Optional: Adjust as needed for spacing between grid items
            backgroundColor="white"
          >
            <GridItem area={"nav"}>
              <NavBar />
            </GridItem>
            <GridItem
              area={"aside"}
              display={{ base: "none", md: "block" }}
              p={4} // Optional: Adds padding inside the sidebar
            >
              <SidebarAppear />
            </GridItem>
            <GridItem
              area={"main"}
              p={4} // Adds padding inside the main content area for spacing
              overflow="auto" // Ensures content within main can scroll if it overflows
            >
              <main>
                <MainContent />
              </main>
            </GridItem>
          </Grid>
        </OrderStatusProvider>
      </ContentContextProvider>
    </>
  );
}

export default App;
