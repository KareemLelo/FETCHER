import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { Quest } from "../../Services/QuestInterface";

interface Props {
  quests: Quest;
}

const QuestCards = ({ quests }: Props) => {
  return (
    <Card
      className="mt-10 "
      backgroundColor={"#081A51"}
      maxW="sm"
      borderRadius={10}
      overflow={"hidden"}
      width={"300px"}
    >
      <CardBody>
        <Heading fontSize="2xl" fontFamily={"sans"} paddingBottom={"15px"}>
          {quests.name}
        </Heading>
        <Text className="pb-1">Item Type: {quests.itemType}</Text>
        <Text className="pb-1">Quantity: {quests.quantity}</Text>
        <Text className="pb-1">Direction/Buying: {quests.direction}</Text>
        <Text className="pb-1">Weight: {quests.weight} Kg</Text>
        <Text>Price: {quests.price} JD+</Text>

        {/* <Text className="pb-1">Item Type: Apple Device</Text>
        <Text className="pb-1">Quantity: 1</Text>
        <Text className="pb-1">Direction/Buying: US</Text>
        <Text className="pb-1">Weight: 1.5 Kg</Text>
        <Text>Price:1134 JD +</Text> */}
      </CardBody>
      <div className="flex items-center justify-center">
        <CardFooter>
          <Button width={"200px"} height={"50px"} marginTop={"-10px"}>
            Check Quest
            <div className="bg-white rounded-full ml-2">
              <img
                src="./src/assets/Icons/control.png"
                className={`border-solid border-dark-purple rounded-full
             w-4 rotate-180  `}
              />
            </div>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default QuestCards;
