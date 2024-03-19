import { SimpleGrid } from "@chakra-ui/react";
import QuestCards from "./QuestCards";

export interface Quest {
  name: string;
  itemType: string;
  quantity: number;
  direction: string;
  weight: number;
  price: number;
}

interface Props {
  quests: Quest[];
}

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
  ];
  return (
    <>
      <div>
        <ul>
          <SimpleGrid
            className="flex justify-center"
            columns={{ sm: 1, md: 2, lg: 3 }}
            spacingX={40}
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
