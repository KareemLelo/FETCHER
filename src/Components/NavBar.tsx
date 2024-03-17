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
} from "@chakra-ui/react";
import logo from "../assets/TestLogo.svg";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const NavBar = () => {
  const pages = ["Home", "Terms&Co", "Contact"];
  const [page, setPage] = useState("");
  return (
    <>
      <div className="bg-dark-purple">
        <HStack justifyContent={"space-between"} className="p-3">
          <Image src={logo} boxSize={"40px"} />
          <List display={"flex"}>
            {pages.map((page, index) => (
              <ListItem
                key={index}
                className="border-2 border-solid border-white rounded-lg p-1"
                marginX={10}
              >
                <Button variant={"link"} onClick={() => setPage(page)}>
                  {page}
                </Button>
              </ListItem>
            ))}
          </List>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant={"outline"}
            />
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem>New Quest</MenuItem>
              <MenuItem>My Credit Card</MenuItem>
              <MenuItem>View My Fetcher</MenuItem>
              <MenuItem>Track My Order</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </div>
    </>
  );
};

export default NavBar;
