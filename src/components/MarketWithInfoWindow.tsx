import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import MarkerContentContainer from "@/features/mapContainer/MarkerContentContainer";

interface MarkerWithInfoWindowInterface {
  latitude: number;
  longitude: number;
  stationName: string;
  portfolio: string;
  stationId: number;
  site: string;
}

const MarkerWithInfoWindow: React.FC<MarkerWithInfoWindowInterface> = ({
  latitude,
  longitude,
  stationName,
  portfolio,
  stationId,
  site
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
          <MarkerContentContainer id={stationId} site={site} />
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
