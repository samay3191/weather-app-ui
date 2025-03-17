import InputSelector from "@/components/InputSelector";
import { useStore } from "@/store/store";
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

  return (
    <InputSelector
      label="Select State"
      placeHolder="Select state"
      optionList={stateList}
      value={currentState || []}
      onChange={setCurrentState}
      disabled={!stateList || stateList.length === 0}
    />
  );
};

export default StateSelector;
