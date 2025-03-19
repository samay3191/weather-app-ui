import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";
import { useStore } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { WeatherStation } from "@/types/types";
import { Spinner, Text, VStack } from "@chakra-ui/react";
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
  const currentStation = useStore((state) => state.currentStation);

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
    if (!stations || stations.length === 0) return;
    let updatedList = stations;
    let zoomValue = 5;
  
    if (currentState?.length) {
      updatedList = updatedList.filter(
        (station) => station.state === currentState[0]
      );
      zoomValue = 7;

      if (currentStation?.length) {
        updatedList = updatedList.filter(
          (station) => station.id.toString() === currentStation[0].toString()
        );
        zoomValue = 8;
      }
    }

    setFilteredStations(updatedList);

    if (updatedList.length > 0) {
      setCameraProps({
        center: {
          lat: updatedList[0].latitude,
          lng: updatedList[0].longitude,
        },
        zoom: zoomValue,
      });
    }
  }, [stations, currentState, currentStation, setFilteredStations]);

  if (filteredStations.length === 0) {
    return (
      <VStack alignContent={"center"} width={"100%"}>
        <Spinner />
        <Text>Fetching Data...</Text>
        <Text color={"gray.400"}>
          Please make sure backend service is started
        </Text>
      </VStack>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={"AdvanceMapforPRAApp"}
        style={{ width: "calc(100vw - 252px)", height: "calc(100vh - 44px)" }}
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
