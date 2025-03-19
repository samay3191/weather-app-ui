import { Box } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      py={"2"}
      px={"4"}
      fontWeight={"semibold"}
      bgColor={"blue.500"}
      color={"white"}
      fontSize={"lg"}
      shadow={"lg"}
      zIndex={11}
    >
      Sample Weather App
    </Box>
  );
};

export default Header;
