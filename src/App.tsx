import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import "@fontsource/poppins";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
/* import CreditCardGrid from "./Components/CreditCardGrid";
import QuestGrid from "./Components/Fetcher/QuestCardGrid";
import QuestForm from "./Components/QuestForm";
import Login from "./Components/Login";
import Register from "./Components/Register"; */
import QuestListGrid from "./Components/Fetcher/QuestListGrid";

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
            {/* <QuestGrid /> */}
            {/* <QuestForm /> */}
            {/* <Login /> */}
            {/* <Register /> */}
            {/* <CreditCardGrid /> */}
            <QuestListGrid quests={quests} />
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default App;
