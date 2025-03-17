import { InfoWindow } from "@vis.gl/react-google-maps";
import MarkerContentContainer from "./MarkerContentContainer";
import { useStore } from "@/store/store";

const InfoWindowContainer = () => {
  const currentMarker = useStore((state) => state.currentMarker);
  const selectedStation = useStore((state) => state.selectedStation);
  const showInfoWindow = useStore((state) => state.showInfoWindow);
  const setShowInfoWindow = useStore((state) => state.setShowInfoWindow);

  return (
    <>
      {currentMarker && showInfoWindow && (
        <InfoWindow
          anchor={currentMarker}
          maxWidth={350}
          onCloseClick={() => setShowInfoWindow(false)}
          style={{ fontSize: "12px" }}
          headerContent={`${selectedStation?.ws_name} (${selectedStation?.portfolio})`}
        >
          <MarkerContentContainer
            id={selectedStation?.id as number}
            site={selectedStation?.site as string}
          />
        </InfoWindow>
      )}
    </>
  );
};

export default InfoWindowContainer;
