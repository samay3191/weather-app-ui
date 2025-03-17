import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { WeatherStation } from "@/types/types";
import { Spinner } from "@chakra-ui/react";
import InfoWindowContainer from "@/features/mapContainer/InfoWindowContainer";
import MarkerContainer from "@/features/mapContainer/MarkerContainer";

const GoogleMapViewer = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY as string;
  const stations = useStore((state) => state.stations);
  const currentState = useStore((state) => state.currentState);

  const [filteredStations, setFilteredStations] = useState<WeatherStation[]>(
    []
  );

  useEffect(() => {
    if (stations && stations.length > 0) {
      if (currentState && currentState.length > 0) {
        const newStationList = stations.filter(
          (station) => station.state === currentState[0]
        );
        setFilteredStations(newStationList);
      } else {
        setFilteredStations(stations);
      }
    }
  }, [stations, currentState, setFilteredStations]);

  if (filteredStations.length === 0) {
    return <Spinner />;
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={"AdvanceMapforPRAApp"}
        style={{ width: "calc(100vw - 252px)", height: "100vh" }}
        defaultZoom={5}
        defaultCenter={{
          lat: filteredStations[0].latitude ?? -24.983872,
          lng: filteredStations[0].longitude ?? 134.483427,
        }}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        {filteredStations &&
          filteredStations.map((station) => (
            <MarkerContainer
              key={station.id + station.ws_name}
              station={station}
            />
          ))}
        <InfoWindowContainer />
      </Map>
    </APIProvider>
  );
};

export default GoogleMapViewer;
