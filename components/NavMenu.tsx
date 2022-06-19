import {
  Box,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";

import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdFavorite,
  MdPlaylistAdd,
} from "react-icons/md";

import NextLink from "next/link";

const navMenu = [
  { title: "Home", icon: MdHome, route: "/" },
  { title: "Search", icon: MdSearch, route: "/search" },
  { title: "Your Library", icon: MdLibraryMusic, route: "/library" },
];

const NavMenu = () => {
  return (
    <Box marginBottom="20px">
      <List spacing={2}>
        {navMenu.map((menu) => (
          <ListItem paddingX="20px" fontSize="16px" key={menu.title}>
            <LinkBox>
              <NextLink href={menu.route} passHref>
                <LinkOverlay>
                  <ListIcon as={menu.icon} marginRight="20px" color="white" />
                  {menu.title}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavMenu;
