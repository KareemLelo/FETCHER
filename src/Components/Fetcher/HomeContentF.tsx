import { SimpleGrid, Heading, Flex, Box, Text } from "@chakra-ui/react";
import QuestCards from "./QuestCards";
import { useEffect, useState } from "react";
import { fetchQuests } from "../../Services/Api";
import { Quest } from "../../Services/Interface";
/* import { useState } from "react";
import { Quest } from "../../Services/QuestInterface"; */

const HomeContentF = () => {
  const [quests, setQuests] = useState<Quest[]>([]);

  if (!quests) {
    return <Text>No quest data available</Text>;
  }

  useEffect(() => {
    fetchQuests()
      .then((quests) => {
        console.log("Fetched quests:", quests); // Add this to check the structure
        setQuests(quests);
      })
      .catch((error) => console.error("Error fetching quests:", error));
  }, []);
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
          {quests.map((quest, index) => (
            <QuestCards key={index} quests={quest} />
          ))}
        </SimpleGrid>
      </ul>
    </>
  );
};

export default HomeContentF;
