import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";
import { useStore } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { WeatherStation } from "@/types/types";
import { Spinner } from "@chakra-ui/react";
import InfoWindowContainer from "@/features/mapContainer/InfoWindowContainer";
import MarkerContainer from "@/features/mapContainer/MarkerContainer";

const GoogleMapViewer = () => {
  const INITIAL_CAMERA = {
    center: { lat: -24.983872, lng: 134.483427 },
    zoom: 5,
  };
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY as string;
  const stations = useStore((state) => state.stations);
  const currentState = useStore((state) => state.currentState);

  const [filteredStations, setFilteredStations] = useState<WeatherStation[]>(
    []
  );
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
    [setCameraProps]
  );

  useEffect(() => {
    if (stations && stations.length > 0) {
      let updatedList: WeatherStation[] = [];
      if (currentState && currentState.length > 0) {
        const newStationList = stations.filter(
          (station) => station.state === currentState[0]
        );
        updatedList = JSON.parse(JSON.stringify(newStationList));
        setFilteredStations(newStationList);
      } else {
        updatedList = JSON.parse(JSON.stringify(stations));
        setFilteredStations(stations);
      }
      setCameraProps({
        center: {
          lat: updatedList[0].latitude,
          lng: updatedList[0].longitude,
        },
        zoom: 5,
      });
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
        gestureHandling={"greedy"}
        disableDefaultUI
        {...cameraProps}
        onCameraChanged={handleCameraChange}
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
