import React, { useState } from "react";
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
  Icon,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { BsCreditCard, BsAirplaneEngines } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { RiFileUserLine } from "react-icons/ri";
import avatar from "../assets/Icons/Avatar.png"; // Ensure this path is correct
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../Hooks/ContentContext";

const MotionBox = motion(Box);
const MotionListItem = motion(ListItem);

const SideBar = () => {
  const { setContent, accountType, logout } = useContent();
  const [open, setOpen] = useState(true);

  const questMakerMenus = [
    {
      title: "My Profile",
      icon: RiFileUserLine,
    },
    { title: "My Credit Card", icon: BsCreditCard },
    { title: "New Quest", icon: AiOutlineShopping, gap: true },
    { title: "Track My Order", icon: BsAirplaneEngines },
    { title: "Logout", icon: IoIosLogOut },
  ];

  const fetcherMenus = [
    { title: "My Profile", icon: RiFileUserLine },
    { title: "My Credit Card", icon: BsCreditCard },
    {
      title: "Available Quests",
      icon: AiOutlineShopping,
      gap: true,
    },
    { title: "Track My Progress", icon: BsAirplaneEngines },
    { title: "Logout", icon: IoIosLogOut },
  ];

  // Determine which menus to display based on the account type
  const Menus = accountType === "QuestMaker" ? questMakerMenus : fetcherMenus;

  // Theme colors
  const sidebarBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const iconColor = useColorModeValue("gray.500", "gray.200");
  const hoverColor = useColorModeValue("gray.100", "gray.700");

  // Handle menu click
  const handleMenuClick = (title: string) => {
    if (title === "Logout") {
      logout();
    } else {
      setContent(title);
    }
  };

  return (
    <MotionBox
      h="100vh"
      initial={false}
      animate={{ width: open ? "250px" : "80px" }}
      transition={{ duration: 0.5 }}
    >
      <Flex
        direction="column"
        bg={sidebarBg}
        p={4}
        pt={8}
        alignItems="center"
        justifyContent="flex-start"
        h="full"
      >
        <VStack gap="4" alignItems={open ? "flex-start" : "center"} w="full">
          <Image src={avatar} borderRadius="full" boxSize="50px" />
          <AnimatePresence>
            {open && (
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Text fontSize="xl" fontWeight="medium" color={textColor}>
                  {accountType === "QuestMaker" ? "QuestMaker" : "Fetcher"}
                </Text>
              </MotionBox>
            )}
          </AnimatePresence>
        </VStack>
        <List spacing={3} mt="6" w="full">
          {Menus.map((menu, index) => (
            <MotionListItem
              key={index}
              p={2}
              rounded="md"
              _hover={{ bg: hoverColor, color: textColor }}
              mt={menu.gap ? 6 : 2}
              display="flex"
              alignItems="center"
              gap="4"
              cursor="pointer"
              onClick={() => handleMenuClick(menu.title)}
              layout
            >
              <Icon as={menu.icon} boxSize="24px" color={iconColor} />
              <AnimatePresence>
                {open && (
                  <MotionBox
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text color={textColor}>{menu.title}</Text>
                  </MotionBox>
                )}
              </AnimatePresence>
            </MotionListItem>
          ))}
        </List>
      </Flex>
    </MotionBox>
  );
};

export default SideBar;
