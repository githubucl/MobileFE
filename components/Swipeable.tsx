import React, { useState, useEffect } from "react";
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
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <View style={{ flex: 6, backgroundColor: "#DEE9F7" }}>
      <Carousel
        loop={false}
        width={windowWidth}
        data={[ChatSection, ChatSection]}
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
