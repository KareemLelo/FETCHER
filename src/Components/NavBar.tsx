import {
  Box,
  Flex,
  Text,
  Stack,
  Collapse,
  Link,
  Button,
  useDisclosure,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { useContent } from "../ContentContext";

const NavBar = () => {
  const { isOpen } = useDisclosure();
  const { setContent } = useContent();

  return (
    <Box bg="brand.background" px={4}>
      {" "}
      {/* Using the background color from the theme */}
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Text color="brand.text" fontSize="xl" fontWeight="bold">
              Logo
            </Text>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {["Home", "Terms&Co", "Contact"].map((link) => (
              <Link
                key={link}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{ textDecoration: "none", bg: "brand.accent" }} // Using the accent color for hover
                href={"#"}
                color="brand.text" // Text color for better contrast
              >
                {link}
              </Link>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button
            variant={"solid"}
            bg="brand.primary" // Primary button color
            size={"sm"}
            mr={4}
            leftIcon={<Icon as={FaRegUser} />}
            _hover={{ bg: "brand.secondary" }} // Change for hover state
            onClick={() => setContent("login")}
          >
            Login
          </Button>
          <Button
            variant={"outline"}
            borderColor="brand.primary" // Outline based on primary color
            color="brand.text"
            size={"sm"}
            _hover={{
              bg: "brand.primary", // Fill color on hover
              color: "brand.background", // Text color on hover for contrast
            }}
            onClick={() => setContent("register")}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg="brand.background" // Ensuring consistency with the navbar background
          p={4}
          display={{ md: "none" }}
        >
          {["Home", "Terms&Co", "Contact"].map((link) => (
            <Link key={link} href={"#"} color="brand.text">
              {link}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export default NavBar;
