import { useStore } from "@/store/store";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import StateSelector from "./StateSelector";
import ClearFilterButton from "./ClearFilterButton";
import StationSelector from "./StationSelector";
import { LuFilter } from "react-icons/lu";

const Filter = () => {
  const stations = useStore((state) => state.stations);
  const fetchStations = useStore((state) => state.fetchStations);

  useEffect(() => {
    if (!stations || stations.length === 0) {
      fetchStations();
    }
  }, [stations, fetchStations]);

  return (
    <VStack
      p={"4"}
      shadow={"lg"}
      height={"100vh"}
      zIndex={10}
      justify={"space-between"}
    >
      <Box alignItems={"baseline"}>
        <Heading pb={"4"} display={"flex"} alignItems={"center"}>
          <LuFilter />
          <Text pl={"2"}>Station Filters</Text>
        </Heading>
        <StateSelector />
        <StationSelector />
        <ClearFilterButton />
      </Box>
      <Text
        color={"gray.400"}
        fontSize={"xs"}
        textAlign={"left"}
        alignSelf={"baseline"}
      >
        Created by{" "}
        <Link
          color={"gray.400"}
          _hover={{ color: "blue.400" }}
          fontWeight={"semibold"}
          href="https://www.linkedin.com/in/samay-bhavsar-02642254/"
          target="_blank"
        >
          Samay.Bhavsar
        </Link>
      </Text>
    </VStack>
  );
};

export default Filter;
