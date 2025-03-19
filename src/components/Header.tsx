import LogoutButton from "@/features/auth/LogoutButton";
import { HStack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <HStack
      py={"2"}
      px={"4"}
      bgColor={"blue.500"}
      zIndex={11}
      shadow={"lg"}
      justify={"space-between"}
    >
      <Text color={"white"} fontSize={"lg"}>
        Sample Weather App
      </Text>
      <LogoutButton />
    </HStack>
  );
};

export default Header;
