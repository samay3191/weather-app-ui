import { Box, HStack } from "@chakra-ui/react";
import Filter from "./features/filter/Filter";
import { Toaster } from "./components/ui/toaster";
import GoogleMapViewer from "./features/mapContainer/GoogleMapViewer";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./features/auth/Login";

function App() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Box minH={"100vh"} h={"full"} w={"full"}>
      <Header />
      <HStack gap={"0"} h={"full"}>
        <Filter />
        <GoogleMapViewer />
      </HStack>
      <Toaster />
    </Box>
  );
}

export default App;
