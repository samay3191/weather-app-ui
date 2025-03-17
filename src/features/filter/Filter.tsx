import { useStore } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

const Filter = () => {
  const stations = useStore((state) => state.stations);
  const fetchStations = useStore((state) => state.fetchStations); // Select separately

  useEffect(() => {
    if (!stations || stations.length === 0) {
      fetchStations();
    }
  }, [stations, fetchStations]);

  return (
    <Box p={"4"} shadow={"md"} height={"100vh"}>
      Filter
    </Box>
  );
};

export default Filter;
