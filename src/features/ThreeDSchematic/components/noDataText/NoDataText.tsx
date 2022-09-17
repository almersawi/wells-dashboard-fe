import { Text } from "@react-three/drei";

const NoDataText = () => {
  return (
    <Text
      fontSize={5}
      outlineWidth={"3%"}
      outlineColor="#000000"
      outlineOpacity={1}
      anchorX="center"
    >
        No data to show
    </Text>
  );
};

export default NoDataText;
