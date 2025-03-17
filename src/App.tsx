import { HStack } from "@chakra-ui/react";
import Filter from "./features/filter/Filter";
import { Toaster } from "./components/ui/toaster";
import MapContainer from "./features/mapContainer/MapContainer";

function App() {
  return (
    <>
      <HStack>
        <Filter />
        <MapContainer />
      </HStack>
      <Toaster />
    </>
  );
}

export default App;
