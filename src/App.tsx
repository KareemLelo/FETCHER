import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/poppins";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import QuestCards from "./Components/QuestCards";
import QuestGrid from "./Components/QuestGrid";

function App() {
  const quests = [
    {
      name: "MacBook",
      itemType: "Laptop",
      quantity: 1,
      direction: "US",
      weight: 1.5,
      price: 1135,
    },
    {
      name: "Nike Dunk Low",
      itemType: "Shoes",
      quantity: 1,
      direction: "Dubai",
      weight: 10,
      price: 112,
    },
    {
      name: "تنكة جبنه",
      itemType: "Food",
      quantity: 4,
      direction: "Kuwait",
      weight: 15,
      price: 115,
    },
    {
      name: "Certificate",
      itemType: "Document",
      quantity: 10,
      direction: "UK",
      weight: 0.5,
      price: 135,
    },
  ];
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
            <QuestGrid />
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default App;
