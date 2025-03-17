import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import MarkerContent from "./MarkerContent";

interface MarkerWithInfoWindowInterface {
  latitude: number;
  longitude: number;
  stationName: string;
  portfolio: string;
}

const MarkerWithInfoWindow: React.FC<MarkerWithInfoWindowInterface> = ({
  latitude,
  longitude,
  stationName,
  portfolio,
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: latitude, lng: longitude }}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={350}
          onCloseClick={() => setInfowindowOpen(false)}
          style={{ fontSize: "12px" }}
          headerContent={`${stationName} (${portfolio})`}
        >
          <MarkerContent />
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
