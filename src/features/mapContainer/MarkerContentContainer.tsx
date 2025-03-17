import MarkerContent from "@/components/MarkerContent";
import { useStore } from "@/store/store";
import { ActionStatus } from "@/types/enums";
import { WeatherData } from "@/types/types";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface MarkerContentContainerInterface {
  site: string;
  id: number;
}

const MarkerContentContainer: React.FC<MarkerContentContainerInterface> = ({
  id,
  site,
}) => {
  const selectedStationWeatherData = useStore(
    (state) => state.selectedStationWeatherData
  );
  const status = useStore((state) => state.status);
  const fetchWeatherData = useStore((state) => state.fetchWeatherData);
  const [measurementData, setMeasurementData] = useState<WeatherData[]>([]);

  useEffect(() => {
    if (selectedStationWeatherData?.length === 0) {
      fetchWeatherData(id);
    } else if (
      selectedStationWeatherData &&
      selectedStationWeatherData?.length > 0
    ) {
      const myStationData = selectedStationWeatherData.filter(
        (wd) => wd.weather_station_id === id
      );
      if (myStationData.length === 0) {
        fetchWeatherData(id);
      } else {
        setMeasurementData(myStationData);
      }
    }
  }, [selectedStationWeatherData, fetchWeatherData, id]);

  if (status === ActionStatus.LOADING || measurementData.length === 0) {
    return (
      <Box>
        <Spinner color={"red.500"} />
        Fetching Data...
      </Box>
    );
  }

  return <MarkerContent site={site} measurementData={measurementData} />;
};

export default MarkerContentContainer;
