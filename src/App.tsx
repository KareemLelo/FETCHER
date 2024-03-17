import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";

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
        >
          <GridItem area={"nav"}>
            <NavBar />
          </GridItem>
          <Show above="lg">
            <GridItem area={"aside"} backgroundColor={"white"}>
              <SideBar />
            </GridItem>
          </Show>
          <GridItem area={"main"} backgroundColor={"lightblue"}>
            main
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default App;
