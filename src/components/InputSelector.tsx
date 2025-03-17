import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { memo } from "react";

export type InputSelectorOptions = {
  label: string;
  value: string;
};

interface InputSelectorInterface {
  label: string;
  placeHolder: string;
  optionList: InputSelectorOptions[];
  value: string[];
  onChange: (val: string[]) => void;
  disabled?: boolean;
}

const InputSelector: React.FC<InputSelectorInterface> = ({
  label,
  placeHolder,
  optionList,
  value,
  onChange,
  disabled = false,
}) => {
  const selectorOptions = createListCollection({
    items: optionList,
  });

  return (
    <Select.Root
      pt={"4"}
      collection={selectorOptions}
      size="sm"
      width="220px"
      cursor={"pointer"}
      value={value || []}
      onValueChange={(e) => onChange(e.value)}
      disabled={disabled}
    >
      <Select.HiddenSelect />
      <Select.Label>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeHolder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {selectorOptions.items.map((option) => (
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

export default memo(InputSelector);
