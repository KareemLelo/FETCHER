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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BsCreditCard, BsAirplaneEngines } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { RiFileUserLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { CgCopy } from "react-icons/cg";
import { TiHomeOutline } from "react-icons/ti";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { useContent } from "../ContentManagment/ContentContext"; // Ensure this is the correct path to your ContentContext

const questMakerMenus = [
  {
    title: "Home",
    icon: TiHomeOutline,
  },
  {
    title: "Terms&Co",
    icon: CgCopy,
  },
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
  {
    title: "Home",
    icon: TiHomeOutline,
  },
  {
    title: "Terms&Co",
    icon: CgCopy,
  },
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

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { setContent, accountType, logout } = useContent();

  const handleMenuClick = (title: string) => {
    if (title === "Logout") {
      logout();
    } else {
      setContent(title);
    }
  };

  const Menus = accountType === "QuestMaker" ? questMakerMenus : fetcherMenus;

  const bg = "brand.background";
  const color = "brand.text";

  return (
    <Box px={4} bg={bg} w="full">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Center
          flex={{ base: 1, md: 0 }}
          justifyContent={{ base: "center", md: "start" }}
        >
          <Text fontSize="xl" fontWeight="bold" color={color}>
            Logo
          </Text>
        </Center>

        {/* Menu Items and Buttons for larger screens */}
        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          {Menus.slice(0, 2).map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              mx={2}
              color={color}
              _hover={{ bg: "brand.secondary" }}
              onClick={() => handleMenuClick(item.title)}
            >
              {item.title}
            </Button>
          ))}
        </Flex>

        {accountType ? (
          <Avatar
            size="sm"
            /* src={user.avatarUrl} */
            bg="brand.primary"
            color="white"
          >
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
        ) : (
          <Stack direction="row" alignItems="center" display={{ md: "flex" }}>
            <Button
              width={{ base: "65px", md: "auto" }}
              variant="solid"
              bg="brand.primary"
              size="sm"
              leftIcon={<FaRegUser />}
              onClick={() => setContent("login")}
              mr={4}
              _hover={{ bg: "brand.highlight" }}
            >
              Login
            </Button>
            <Button
              width={{ base: "65px", md: "auto" }}
              variant="outline"
              borderColor="brand.primary"
              size="sm"
              color={color}
              onClick={() => setContent("register")}
              _hover={{ bg: "brand.highlight" }}
            >
              Sign Up
            </Button>
          </Stack>
        )}

        {accountType && (
          <Popover isOpen={isOpen} onClose={onToggle} placement="bottom-start">
            <PopoverTrigger>
              <IconButton
                aria-label="Open Menu"
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                display={{ base: "flex", md: "none" }}
                onClick={onToggle}
                variant="outline"
                position="absolute" // Ensure the button is positioned in a way that the menu can align to it
                left={4} // Align to the left
                top={3} // Adjust this value as necessary to position correctly under the navbar
                color={"white"}
                bg={"brand.primary"}
                _hover={{ bg: "brand.highlight" }}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg="brand.primary"
                mt={3}
                p={4}
                width="auto" // Adjust width as needed
                maxW="sm" // Limit max width to avoid stretching across the screen
              >
                <Stack>
                  {Menus.map((item) => (
                    <Box>
                      <Icon as={item.icon} boxSize="24px" />
                      <Button
                        key={item.title}
                        variant="ghost"
                        justifyContent="start"
                        onClick={() => handleMenuClick(item.title)}
                      >
                        {item.title}
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
