import {
  Button,
  HStack,
  IconButton,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import logo from "../assets/TestLogo.svg";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const NavBar = () => {
  const pages = ["Home", "Terms&Co", "Contact"];
  const [page, setPage] = useState("");
  const ItemsList = [
    "My Profile",
    "New Quest",
    "My Credit Card",
    "View My Fetcher",
    "Track My Order",
  ];

  // Determine if the full navigation should be displayed based on the current breakpoint
  const displayFullNav = useBreakpointValue({ base: false, md: true });

  return (
    <div className="bg-dark-purple">
      <HStack justifyContent={"center"} p={3}>
        <Image src={logo} boxSize={"40px"} />
        {displayFullNav ? (
          <List display={"flex"}>
            {pages.map((page, index) => (
              <ListItem
                key={index}
                className="border-2 border-solid border-white rounded-lg p-1 mx-2"
              >
                <Button variant={"link"} onClick={() => setPage(page)}>
                  {page}
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant={"outline"}
            />
            <MenuList backgroundColor={"#081A51"}>
              {pages.map((page, index) => (
                <MenuItem
                  backgroundColor={"#081A51"}
                  key={index}
                  onClick={() => setPage(page)}
                >
                  {page}
                </MenuItem>
              ))}

              {ItemsList.map((item) => (
                <MenuItem backgroundColor={"#081A51"}>{item}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </HStack>
    </div>
  );
};

export default NavBar;
