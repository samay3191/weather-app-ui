import { useStore } from "@/store/store";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import StateSelector from "./StateSelector";
import ClearFilterButton from "./ClearFilterButton";
import StationSelector from "./StationSelector";

const Filter = () => {
  const stations = useStore((state) => state.stations);
  const fetchStations = useStore((state) => state.fetchStations);

  useEffect(() => {
    if (!stations || stations.length === 0) {
      fetchStations();
    }
  }, [stations, fetchStations]);

  return (
    <Box p={"4"} shadow={"md"} height={"100vh"}>
      <Heading pb={"4"}>Filters</Heading>
      <StateSelector />
      <StationSelector />
      <ClearFilterButton />
    </Box>
  );
};

export default Filter;
