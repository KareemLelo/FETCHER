import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/poppins";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <>
      <div>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "aside main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "400px 1fr",
          }}
        >
          <GridItem area={"nav"}>
            <NavBar />
          </GridItem>
          <Show above="lg">
            <GridItem area={"aside"} backgroundColor={"white"}>
              <SideBar />
            </GridItem>
          </Show>
          <GridItem area={"main"} backgroundColor={"white"}>
            main
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default App;
