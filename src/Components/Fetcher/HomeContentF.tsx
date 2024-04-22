import { SimpleGrid, Heading, Flex, Box } from "@chakra-ui/react";
import QuestCards from "./QuestCards";
/* import { useState } from "react";
import { Quest } from "../../Services/QuestInterface"; */

/* interface Props {
  quests: Quest[];
} */

const HomeContentF = () => {
  /* const [quests, setQuests] = useState<Quest[]>([]); */

  const quest = [
    {
      name: "MacBook",
      itemType: "Laptop",
      quantity: 1,
      direction: "US",
      weight: 1.5,
      price: 1135,
      link: "#",
    },
    {
      name: "Nike Dunk Low",
      itemType: "Shoes",
      quantity: 1,
      direction: "Dubai",
      weight: 10,
      price: 112,
      link: "#",
    },
    {
      name: "تنكة جبنه",
      itemType: "Food",
      quantity: 4,
      direction: "Kuwait",
      weight: 15,
      price: 115,
      link: "#",
    },
    {
      name: "Certificate",
      itemType: "Document",
      quantity: 10,
      direction: "UK",
      weight: 0.5,
      price: 135,
      link: "#",
    },
    {
      name: "Certificate",
      itemType: "Document",
      quantity: 10,
      direction: "UK",
      weight: 0.5,
      price: 135,
      link: "#",
    },
  ];
  return (
    <>
      <Box display="flex" justifyContent="center" width="auto" m={"10"}>
        <Flex
          justifyContent="center" // Centers children vertically in the container
          alignItems="center" // Centers children horizontally in the container
          width={{ sm: "260px", md: "300px", lg: "400px" }}
          textAlign="center"
        >
          <Heading
            color="brand.text"
            fontSize={{ base: "30px", md: "30px", lg: "40px" }}
          >
            Available Quests Awaiting for You to Fetch!
          </Heading>
        </Flex>
      </Box>
      <ul>
        <SimpleGrid
          minChildWidth={"250px"}
          spacingY="20px"
          spacingX="5px"
          width="auto"
          className="flex justify-center mt-10"
          columns={{ sm: 1, md: 3, lg: 4, xl: 5 }}
          p={7}
        >
          {quest.map((quest, index) => (
            <QuestCards key={index} quests={quest} />
          ))}
        </SimpleGrid>
      </ul>
    </>
  );
};

export default HomeContentF;
