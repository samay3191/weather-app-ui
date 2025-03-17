import { WeatherData } from "@/types/types";
import { Text, VStack } from "@chakra-ui/react";

interface MarkerContentInterface {
  measurementData?: WeatherData[];
}

const MarkerContent: React.FC<MarkerContentInterface> = ({
  measurementData = [],
}) => {
  return (
    <VStack
      mt={"1"}
      p={"2"}
      rounded={"md"}
      border={"solid"}
      borderColor={"red.500"}
    >
      {measurementData.map((data) => (
        <Text fontSize={"xs"}>
          {data.long_name}: {data.value} {data.unit}
        </Text>
      ))}
    </VStack>
  );
};

export default MarkerContent;
