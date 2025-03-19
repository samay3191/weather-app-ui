import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@chakra-ui/react";
import { RiLogoutBoxLine } from "react-icons/ri";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  return (
    <IconButton
      rounded={"full"}
      bgColor={"white"}
      color={"black"}
      _hover={{ color: "teal" }}
      onClick={handleLogout}
      size={"xs"}
      aria-label="Logout User"
    >
      <RiLogoutBoxLine />
    </IconButton>
  );
};

export default LogoutButton;
