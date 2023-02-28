import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ChatSection from "./ChatSection";
import Possibility from "./Possibility";

const verticleSwipeable = () => {
  const [height, setHeight] = useState(10);
  return (
    <View
      style={{ flex: 6 }}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      <Carousel
        loop={false}
        height={height}
        vertical
        data={[...new Array(3).keys()]}
        scrollAnimationDuration={200}
        withAnimation={{
          type: "spring",
          config: {
            damping: 15,
          },
        }}
        renderItem={({ index }: { index: number }) => (
          <View
            style={{
              flex: 1,

              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
};

const Swipeable = () => {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 6, backgroundColor: "#DEE9F7" }}>
      <Carousel
        loop={false}
        width={width}
        data={[ChatSection, Possibility]}
        scrollAnimationDuration={200}
        withAnimation={{
          type: "spring",
          config: {
            damping: 15,
          },
        }}
        renderItem={({ item }) => item()}
      />
    </View>
  );
};

export default Swipeable;
