import { WeatherData } from "@/types/types";
import { Text, VStack } from "@chakra-ui/react";
import { memo } from "react";

interface MarkerContentInterface {
  site: string;
  measurementData: WeatherData[];
}

const MarkerContent: React.FC<MarkerContentInterface> = ({
  site,
  measurementData,
}) => {
  return (
    <VStack
      p={"2"}
      rounded={"md"}
      border={"solid"}
      borderColor={"red.500"}
      align={"baseline"}
      gap={"0.5"}
    >
      <Text
        fontSize={"sm"}
        fontWeight={"bold"}
        borderBottom={"solid"}
        mb={"2"}
        pb={"1"}
      >
        {site}
      </Text>
      {measurementData.map((data) => (
        <Text key={data.id} fontSize={"xs"} textAlign={"left"}>
          <Text as={"span"} fontWeight={"bold"}>
            {data.long_name}
          </Text>
          :
          <Text as={"span"} pl={"1"} fontWeight={"bold"} color={"blue.solid"}>
            {data.value}
          </Text>{" "}
          {data.unit}
        </Text>
      ))}
      {measurementData?.length > 0 && measurementData[0].timestamp && (
        <Text pt={"3"}>
          Last Fetched on{" "}
          <Text as={"span"} fontWeight={"semibold"} color={"GrayText"}>
            {measurementData[0].timestamp}
          </Text>
        </Text>
      )}
    </VStack>
  );
};

export default memo(MarkerContent);
