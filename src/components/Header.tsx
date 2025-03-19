import LogoutButton from "@/features/auth/LogoutButton";
import { HStack, Text } from "@chakra-ui/react";
import WelcomeUser from "./WelcomeUser";

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
      <HStack>
        <WelcomeUser />
        <LogoutButton />
      </HStack>
    </HStack>
  );
};

export default Header;
