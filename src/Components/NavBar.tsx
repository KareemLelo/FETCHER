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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaRegUser } from "react-icons/fa";
import { useContent } from "../ContentContext"; // Ensure this is the correct path to your ContentContext

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { setContent } = useContent();

  const bg = "brand.background";
  const color = "brand.text";

  const menuItems = [
    { title: "Home", src: "" },
    { title: "Terms&Co", src: "" },
    { title: "Contact", src: "" },
    { title: "My Profile", src: "Chart_fill" },
    { title: "My Credit Card", src: "Chat" },
    { title: "New Quest", src: "User" },
    { title: "View My Fetcher", src: "Calendar" },
    { title: "Track My Order", src: "Search" },
  ];

  return (
    <Box px={4} bg={bg} w="full">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo: Centered on smaller screens, left-aligned on larger screens */}
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
          {menuItems.slice(0, 3).map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              mx={2}
              onClick={() => setContent(item.title)}
              color={color}
              _hover={{ bg: "brand.secondary" }}
            >
              {item.title}
            </Button>
          ))}
        </Flex>

        <Stack direction="row" alignItems="center" display={{ md: "flex" }}>
          <Button
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

        {/* Collapsible Menu for smaller screens */}
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
                {menuItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    justifyContent="start"
                    onClick={() => setContent(item.title)}
                  >
                    {item.title}
                  </Button>
                ))}
              </Stack>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
    </Box>
  );
};

export default NavBar;
