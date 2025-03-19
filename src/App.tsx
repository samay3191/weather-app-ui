import { Box, HStack } from "@chakra-ui/react";
import Filter from "./features/filter/Filter";
import { Toaster } from "./components/ui/toaster";
import GoogleMapViewer from "./features/mapContainer/GoogleMapViewer";
import Header from "./components/Header";

function App() {
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
