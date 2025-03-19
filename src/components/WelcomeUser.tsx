import { useStore } from "@/store/store";
import { User } from "@auth0/auth0-react";
import { Text } from "@chakra-ui/react";

const WelcomeUser = () => {
  const user: User | null = useStore((state) => state.user);

  return (
    <Text pr={"4"} fontSize={"sm"} color={"white"}>
      Welcome{" "}
      <Text as={"span"} fontWeight={"semibold"}>
        {user?.name}
      </Text>{" "}
      !
    </Text>
  );
};

export default WelcomeUser;
