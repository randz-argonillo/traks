import { Box, Divider, Center } from "@chakra-ui/layout";

import Logo from "./Logo";
import NavMenu from "./NavMenu";

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px">
        <Logo />
        <NavMenu />
      </Box>
    </Box>
  );
};

export default Sidebar;
