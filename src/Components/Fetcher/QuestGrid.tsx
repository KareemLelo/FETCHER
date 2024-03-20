import { SimpleGrid } from "@chakra-ui/react";
import QuestCards from "./QuestCards";

/* interface Props {
  quests: Quest[];
} */

const QuestGrid = () => {
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
        <ul>
          <SimpleGrid
            minChildWidth={"250px"} // or use "columns" prop for fixed number of columns
            spacingY="10px"
            spacingX={"-10px"} // Adjust the spacing between items
            width="100%"
            className="flex justify-center mt-10"
            columns={{ sm: 1, md: 3, lg: 4, xl: 5 }}
          >
            {quests.map((quest) => (
              <QuestCards quests={quest} />
            ))}
          </SimpleGrid>
        </ul>
      </div>
    </>
  );
};

export default QuestGrid;
