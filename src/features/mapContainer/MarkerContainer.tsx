import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useStore } from "@/store/store";
import { WeatherStation } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

interface MarkerContainerInterface {
  station: WeatherStation;
}

const MarkerContainer: React.FC<MarkerContainerInterface> = ({
  station,
}) => {
  const [clicked, setClicked] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const currentMarker = useStore((state) => state.currentMarker);
  const setCurrentMarker = useStore((state) => state.setCurrentMarker);
  const showInfoWindow = useStore((state) => state.showInfoWindow);
  const setShowInfoWindow = useStore((state) => state.setShowInfoWindow);
  const setSelectedStation = useStore((state) => state.setSelectedStation);

  const handleMarkerClick = useCallback(() => {
    setClicked(false);
    setCurrentMarker(marker);
    setShowInfoWindow(true);
    setSelectedStation(station);
  }, [
    setClicked,
    setCurrentMarker,
    setShowInfoWindow,
    setSelectedStation,
    marker,
    station,
  ]);

  useEffect(() => {
    if (clicked) {
      if (showInfoWindow || currentMarker) {
        setShowInfoWindow(false);
        setCurrentMarker(null);
      } else {
        handleMarkerClick();
      }
    }
  }, [
    currentMarker,
    showInfoWindow,
    clicked,
    handleMarkerClick,
    setShowInfoWindow,
    setCurrentMarker,
  ]);

  return (
    <AdvancedMarker
      ref={markerRef}
      onClick={() => setClicked(true)}
      position={{ lat: station.latitude, lng: station.longitude }}
      title={`Marker for station ${station.ws_name} - ${station.site}`}
    />
  );
};

export default MarkerContainer;
