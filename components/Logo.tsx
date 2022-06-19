import { Box } from "@chakra-ui/layout";
import NextImage from "next/image";

const Logo = () => {
  return (
    <Box width="120px" marginBottom="20px" paddingX="20px">
      <NextImage src="/logo.svg" height={60} width={120} />
    </Box>
  );
};

export default Logo;
