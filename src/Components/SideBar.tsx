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
import avatar from "../assets/Icons/Avatar.png"; // Verify the path
import { useContent } from "../ContentManagment/ContentContext";

const SideBar = () => {
  const { setContent, accountType } = useContent();
  const [open, setOpen] = useState(true);

  const questMakerMenus = [
    { title: "My Profile", src: "Chart_fill" },
    { title: "My Credit Card", src: "Chat" },
    { title: "New Quest", src: "User", gap: true },
    { title: "View My Fetcher", src: "Calendar" },
    { title: "Track My Order", src: "Search" },
    { title: "Logout", src: "Search" },
  ];

  const fetcherMenus = [
    { title: "My Profile", src: "Chart_fill" },
    { title: "My Credit Card", src: "Chat" },
    { title: "Available Quests", src: "User", gap: true },
    { title: "My Mission", src: "Chart_fill" },
    { title: "Track My Progress", src: "Calendar" },
    { title: "Rate My Experience", src: "Search" },
    { title: "Logout", src: "Search" },
  ];

  // Determine which menus to display based on the account type
  const Menus = accountType === "QuestMaker" ? questMakerMenus : fetcherMenus;

  // Theme colors
  const sidebarBg = useColorModeValue("brand.secondary", "brand.primary");
  const textColor = useColorModeValue("brand.text", "white");
  const iconColor = useColorModeValue("brand.primary", "brand.accent");

  return (
    <Box h="100vh">
      <Flex direction="row" className={`${!open ? "w-min" : "w-90"} flex`}>
        <Box
          w={open ? "250px" : "90px"}
          bg={sidebarBg}
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
                {accountType === "QuestMaker" ? "QuestMaker" : "Fetcher"}
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
                <img
                  src={`./src/assets/Icons/${menu.src}.png`}
                  alt={menu.title}
                />
                {open && <Text color={textColor}>{menu.title}</Text>}
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBar;
