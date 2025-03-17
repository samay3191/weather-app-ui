import { useStore } from "@/store/store";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const StationSelector = () => {
  const [stationList, setStationList] = useState<
    { label: string; value: number }[]
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
        .map((station) => ({ label: station.ws_name, value: station.id }));
      setStationList(newList);
    }
  }, [stations, currentStation, currentState]);

  const stationOptions = createListCollection({
    items: stationList,
  });

  return (
    <Select.Root
      pt={"4"}
      collection={stationOptions}
      size="sm"
      width="220px"
      cursor={"pointer"}
      value={currentStation || []}
      onValueChange={(e) => setCurrentStation(e.value)}
      disabled={!currentState || currentState.length === 0}
    >
      <Select.HiddenSelect />
      <Select.Label>Select Weather Station</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select weather station" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {stationOptions.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default StationSelector;
