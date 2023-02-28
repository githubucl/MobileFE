import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  Dimensions,
} from "react-native";
import NeuMorph from "../NeuMorph";
import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

type TControlPanel = {
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  number: number;
};

const ControlPanel = ({ setNumber, number }: TControlPanel): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false);
  const [horizontal, setHorizontal] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const midPoint = screenWidth / 2;
  const panGesture = Gesture.Pan()
    .onTouchesDown((e) => {
      runOnJS(setIsPressed)(true);
      const { absoluteX } = e.allTouches[0];
      if (absoluteX < midPoint) {
        runOnJS(setNumber)(number - 5);
      } else {
        runOnJS(setNumber)(number + 5);
      }
      Platform.OS !== "web" &&
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    })
    .onUpdate((e) => {
      const { translationX, velocityX } = e;
      runOnJS(setHorizontal)(translationX);

      if (Math.floor(translationX) % 5 === 0) {
        runOnJS(setNumber)(number + (velocityX > 0 ? 5 : -5));
      }
    })
    .onTouchesUp((e) => {
      console.log("e", e);
      runOnJS(setIsPressed)(false);
      runOnJS(setHorizontal)(0);
    });

  return (
    <View style={styles.container}>
      <View style={{ width: "80%", height: "60%", marginTop: 20 }}>
        <GestureDetector gesture={panGesture}>
          <NeuMorph
            isPressed={isPressed}
            horizontal={horizontal}
            shadowOffset={10}
          >
            {/* <Image
              style={styles.dots}
              resizeMode="stretch"
              source={require("../../assets/images/dots.svg")}
            /> */}
            <Text></Text>
          </NeuMorph>
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#DEE9F7",
    alignItems: "center",
  },
  // dots: { width: 400, height: 400, zIndex: 20 },
});

export default ControlPanel;
