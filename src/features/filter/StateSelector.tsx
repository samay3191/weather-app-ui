import { useStore } from "@/store/store";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const StateSelector = () => {
  const [stateList, setStateList] = useState<
    { label: string; value: string }[]
  >([]);
  const states = useStore((state) => state.states);
  const currentState = useStore((state) => state.currentState);
  const setCurrentState = useStore((state) => state.setCurrentState);

  useEffect(() => {
    if (states && states.length > 0) {
      const newList = states.map((state) => ({ label: state, value: state }));
      setStateList(newList);
    }
  }, [states]);

  const stateOptions = createListCollection({
    items: stateList,
  });

  return (
    <Select.Root
      collection={stateOptions}
      size="sm"
      width="220px"
      value={currentState}
      onValueChange={(e) => setCurrentState(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Label>Select State</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select state" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {stateOptions.items.map((option) => (
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

export default StateSelector;
