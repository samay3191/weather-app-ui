import InputSelector from "@/components/InputSelector";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";

const StationSelector = () => {
  const [stationList, setStationList] = useState<
    { label: string; value: string }[]
  >([]);
  const stations = useStore((state) => state.stations);
  const currentState = useStore((state) => state.currentState);
  const currentStation = useStore((state) => state.currentStation);
  const setCurrentStation = useStore((state) => state.setCurrentStation);

  useEffect(() => {
    if (
      currentState &&
      currentState.length > 0 &&
      stations &&
      stations.length > 0
    ) {
      const newList = stations
        .filter((station) => station.state === currentState[0])
        .map((station) => ({
          label: station.ws_name,
          value: station.id.toString(),
        }));
      setStationList(newList);
    }
  }, [stations, currentStation, currentState]);

  return (
    <InputSelector
      label="Select Weather Station"
      placeHolder="Select weather station"
      optionList={stationList}
      value={currentStation || []}
      onChange={setCurrentStation}
      disabled={!currentState || currentState.length === 0}
    />
  );
};

export default StationSelector;
