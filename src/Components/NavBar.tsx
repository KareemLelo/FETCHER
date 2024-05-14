import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  useDisclosure,
  Center,
  Icon,
  Avatar,
  AvatarBadge,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BsCreditCard, BsAirplaneEngines } from "react-icons/bs";
import { AiOutlineShopping, AiFillHome } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { RiFileUserLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { CgCopy } from "react-icons/cg";
import { motion } from "framer-motion";
import { useContent } from "../ContentManagment/ContentContext";

const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { setContent, accountType, logout } = useContent();

  // Determine screen size to manage content visibility
  const isLargerScreen = useBreakpointValue({ base: false, md: true });

  // Decide which menus to show in the NavBar based on the account type
  const allMenus = {
    QuestMaker: [
      { title: "Home", icon: AiFillHome },
      { title: "Terms&Co", icon: CgCopy },
      { title: "My Profile", icon: RiFileUserLine },
      { title: "My Credit Card", icon: BsCreditCard },
      { title: "New Quest", icon: AiOutlineShopping, gap: true },
      { title: "Track My Order", icon: BsAirplaneEngines },
      { title: "Logout", icon: IoIosLogOut },
    ],
    Fetcher: [
      { title: "Home", icon: AiFillHome },
      { title: "Terms&Co", icon: CgCopy },
      { title: "My Profile", icon: RiFileUserLine },
      { title: "My Credit Card", icon: BsCreditCard },
      { title: "Available Quests", icon: AiOutlineShopping, gap: true },
      { title: "Track My Progress", icon: BsAirplaneEngines },
      { title: "Logout", icon: IoIosLogOut },
    ],
  };

  const Menus =
    accountType === "QuestMaker" ? allMenus.QuestMaker : allMenus.Fetcher;

  // Background and color settings
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.600", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  // Handler for menu item click
  const handleMenuClick = (title: string) => {
    if (title === "Logout") {
      logout();
    } else {
      setContent(title);
    }
  };

  return (
    <Box
      px={4}
      bg={bg}
      w="full"
      borderBottomWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <MotionFlex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo and potentially visible large screen menu items */}
        <Flex
          alignItems="center"
          justifyContent={{ base: "center", md: "start" }}
          flex={{ base: 1, md: "auto" }}
        >
          <Text fontSize="xl" fontWeight="bold" color={color} mr={4}>
            FETCHER
          </Text>
          {isLargerScreen &&
            Menus.slice(0, 2).map((item: { title: any; icon: any }) => (
              <MotionButton
                key={item.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="ghost"
                mx={2}
                color={color}
                leftIcon={<Icon as={item.icon} />}
                _hover={{ bg: hoverBg }}
                onClick={() => handleMenuClick(item.title)}
                aria-label={item.title}
              >
                {item.title}
              </MotionButton>
            ))}
        </Flex>

        {/* Avatar or Authentication Options */}
        <Stack direction="row" spacing={4} alignItems="center">
          {accountType ? (
            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              p={0}
              variant="unstyled"
            >
              <Avatar
                size="sm"
                bg={useColorModeValue("brand.primary", "gray.600")}
                color="white"
              >
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            </MotionButton>
          ) : (
            <>
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                width={{ base: "85px", md: "auto" }}
                variant="solid"
                bg={useColorModeValue("brand.primary", "gray.600")}
                size="sm"
                leftIcon={<FaRegUser />}
                onClick={() => setContent("login")}
                _hover={{ bg: hoverBg }}
                aria-label="Login"
              >
                Login
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                width={{ base: "85px", md: "auto" }}
                variant="outline"
                borderColor={useColorModeValue("brand.primary", "gray.600")}
                size="sm"
                color={color}
                onClick={() => setContent("register")}
                _hover={{ bg: hoverBg }}
                aria-label="Sign Up"
              >
                Sign Up
              </MotionButton>
            </>
          )}

          {/* Popover Trigger for Mobile */}
          {accountType && (
            <Popover isOpen={isOpen} onClose={onToggle}>
              <PopoverTrigger>
                <MotionButton
                  aria-label="Open Menu"
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  onClick={onToggle}
                  bg={bg}
                  color={color}
                  _hover={{ bg: hoverBg }}
                  size="md"
                  m={{ base: 1, md: 2 }}
                  display={{ base: "flex", md: "none" }}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent border={0} boxShadow="xl" bg={bg} p={4}>
                  <Stack>
                    {Menus.map((item: { title: any; icon: any }) => (
                      <MotionButton
                        key={item.title}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variant="ghost"
                        justifyContent="start"
                        onClick={() => handleMenuClick(item.title)}
                        leftIcon={<Icon as={item.icon} color={color} />}
                        _hover={{ bg: hoverBg }}
                        w="full"
                        aria-label={item.title}
                      >
                        {item.title}
                      </MotionButton>
                    ))}
                  </Stack>
                </PopoverContent>
              </Portal>
            </Popover>
          )}
        </Stack>
      </MotionFlex>
    </Box>
  );
};

export default NavBar;
