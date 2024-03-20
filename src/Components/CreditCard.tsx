import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";

import { CreditInfo } from "./CreditCardGrid";

interface Props {
  creditCard: CreditInfo;
}

const CreditCard = ({ creditCard }: Props) => {
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
        <Heading fontSize="2xl" fontFamily={"sans"} paddingBottom={15}>
          Visa Card
        </Heading>
        <Text className="pb-1">Card Number: {creditCard.cardNumber}</Text>
        <Text className="pb-1">
          Expiration Date: {creditCard.expirationDate}
        </Text>
        <Text className="pb-1">CVV: {creditCard.CVV}</Text>
        <Text className="pb-1">Card Holder: {creditCard.holderName}</Text>
      </CardBody>
      <div className="flex items-center justify-center">
        <CardFooter>
          <Button width={"200px"} height={"50px"} marginTop={"-10px"}>
            View Info
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

export default CreditCard;
