import {
  SimpleGrid,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import QuestCards from "./QuestCards";
import QuestForm from "../QuestForm"; // Adjust this import based on default or named export
import { useState } from "react";
import { Quest } from "../../Services/QuestInterface";

/* interface Props {
  quests: Quest[];
} */

const QuestGrid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quests, setQuests] = useState<Quest[]>([]);

  const handleAddQuest = (newQuest: Quest) => {
    setQuests([...quests, newQuest]);
    onClose(); // Close the modal after adding a new quest
  };
  const quest = [
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
      <Button onClick={onOpen} mb={4}>
        Create a Quest
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <QuestForm onSave={handleAddQuest} />
        </ModalContent>
      </Modal>
      <ul>
        <SimpleGrid
          minChildWidth={"250px"}
          spacingY="20px"
          spacingX="20px"
          width="100%"
          className="flex justify-center mt-10"
          columns={{ sm: 1, md: 3, lg: 4, xl: 5 }}
        >
          {quest.map((quest, index) => (
            <QuestCards key={index} quests={quest} />
          ))}
        </SimpleGrid>
      </ul>
    </>
  );
};

export default QuestGrid;
