import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/poppins";
import NavBar from "./Components/NavBar";
import MainContent from "./ContentManagment/MainContent";
import { ContentContextProvider } from "./ContentManagment/ContentContext";
import SidebarAppear from "./SidebarAppear";
import { OrderStatusProvider } from "./ContentManagment/OrderStatusContext";

function App() {
  return (
    <>
      <ContentContextProvider>
        <OrderStatusProvider>
          <div>
            <Grid
              templateAreas={{
                base: `"nav" "main"`,
                md: `"nav nav" "aside main"`,
              }}
              templateColumns={{
                base: "1fr",
                md: "250px 1fr",
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
                <SidebarAppear />
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
        </OrderStatusProvider>
      </ContentContextProvider>
    </>
  );
}

export default App;
