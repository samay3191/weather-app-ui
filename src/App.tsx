import { HStack } from "@chakra-ui/react";
import Filter from "./features/filter/Filter";
import { Toaster } from "./components/ui/toaster";
import GoogleMapViewer from "./features/mapContainer/GoogleMapViewer";

function App() {
  return (
    <>
      <HStack gap={"0"}>
        <Filter />
        <GoogleMapViewer />
      </HStack>
      <Toaster />
    </>
  );
}

export default App;
