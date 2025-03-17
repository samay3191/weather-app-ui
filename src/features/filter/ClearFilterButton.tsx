import { useStore } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import { VscClearAll } from "react-icons/vsc";

const ClearFilterButton = () => {
  const clearFilters = useStore((state) => state.clearFilters);
  const currentState = useStore((state) => state.currentState);

  return (
    <Box pt={"8"}>
    <Button
      size={"xs"}
      colorPalette="teal"
      variant="solid"
      onClick={() => clearFilters()}
      disabled={!currentState}
    >
      <VscClearAll /> Clear All
    </Button>
    </Box>
  );
};

export default ClearFilterButton;
