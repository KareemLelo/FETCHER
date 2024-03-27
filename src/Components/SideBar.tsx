import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  useColorModeValue,
  VStack,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import avatar from "../assets/Icons/Avatar.png"; // Make sure the path is correct
import { useContent } from "../ContentContext";

const SideBar = () => {
  const { setContent } = useContent();
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "My Profile", src: "Chart_fill" },
    { title: "My Credit Card", src: "Chat" },
    { title: "New Quest", src: "User", gap: true },
    { title: "View My Fetcher", src: "Calendar" },
    { title: "Track My Order", src: "Search" },
  ];

  // Theme colors
  const sidebarBg = useColorModeValue("brand.secondary", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");
  const iconColor = useColorModeValue("brand.primary", "brand.accent");

  return (
    <Flex direction="row" className={`${!open ? "w-min" : "w-90"} flex`}>
      <Box
        w={open ? "250px" : "90px"}
        bg={sidebarBg}
        h="100vh"
        p={5}
        pt={8}
        position="relative"
        rounded="md"
      >
        <IconButton
          icon={open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Sidebar"
          bgColor={iconColor}
          color="white"
          borderRadius="full"
          position="absolute"
          right="-3"
          top="9"
        />
        <VStack gap="4" alignItems="center">
          <Image src={avatar} borderRadius="full" boxSize="40px" />
          {open && (
            <Text fontSize="xl" fontWeight="medium" color={textColor}>
              QuestMaker
            </Text>
          )}
        </VStack>
        <List spacing={3} mt="6">
          {Menus.map((menu, index) => (
            <ListItem
              key={index}
              p={2}
              rounded="md"
              _hover={{ bg: "RGBA(0, 0, 0, 0.08)" }}
              mt={menu.gap ? 9 : 2}
              display="flex"
              alignItems="center"
              gap="4"
              cursor="pointer"
              onClick={() => setContent(menu.title)}
            >
              <img src={`./src/assets/Icons/${menu.src}.png`} />
              {open && <Text color={textColor}>{menu.title}</Text>}
            </ListItem>
          ))}
        </List>
      </Box>
    </Flex>
  );
};

export default SideBar;
