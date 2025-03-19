import { Box, HStack } from "@chakra-ui/react";
import Filter from "./features/filter/Filter";
import { Toaster } from "./components/ui/toaster";
import GoogleMapViewer from "./features/mapContainer/GoogleMapViewer";
import Header from "./components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./features/auth/Login";
import { useCallback, useEffect } from "react";
import { useStore } from "./store/store";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const setToken = useStore((state) => state.setToken);

  const setUpToken = useCallback(async () => {
    const token: string = await getAccessTokenSilently();
    setToken(token);
  }, [getAccessTokenSilently, setToken]);

  useEffect(() => {
    if (isAuthenticated) {
      setUpToken();
    }
  }, [isAuthenticated, setUpToken]);

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
