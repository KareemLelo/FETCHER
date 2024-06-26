import React from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  AspectRatio,
  useColorModeValue,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";

const HomeContentQM: React.FC = () => {
  const text = useColorModeValue("brand.text", "brand.text"); // New highlight color for buttons

  const items = [
    {
      src: "src/assets/Images/Nike.png",
      aspectRatio: 5 / 2,
      url: "https://nike.com",
    },
    {
      src: "src/assets/Images/CanonCamera.png",
      aspectRatio: 20 / 9,
      url: "https://canon.com",
    },
    {
      src: "src/assets/Images/Apple.png",
      aspectRatio: 20 / 9,
      url: "https://apple.com",
    },
    {
      src: "src/assets/Images/Splash.png",
      aspectRatio: 5 / 2,
      url: "https://splash.com",
    },
  ];

  return (
    <Flex justifyContent={"center"}>
      <Box color={text} textAlign="center" p={1} w={"90%"}>
        <HStack display={"flex"} justifyContent={"center"}>
          <Box
            bgGradient={"linear(to-r, #6a11cb 30%, #2575fc 70%)"}
            bgClip={"text"}
            fontSize={"2xl"}
            fontWeight={"bold"}
          >
            Browse
          </Box>{" "}
          <Box fontSize={"2xl"} fontWeight={"bold"}>
            The Internet
          </Box>
        </HStack>
        <Text fontSize="lg" mb={6}>
          Save the link of the item you want and post it in the New Quest
          Section for it to be Fetched.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5px">
          {items.map((item, index) => (
            <AspectRatio
              key={index}
              ratio={item.aspectRatio}
              boxShadow="lg"
              overflow="hidden"
              borderRadius={10}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
              }}
              onClick={() => window.open(item.url, "_blank")}
            >
              <Image src={item.src} alt="i" objectFit="cover" />
            </AspectRatio>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default HomeContentQM;
