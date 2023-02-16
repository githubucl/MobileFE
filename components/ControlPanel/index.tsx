import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import NeuMorph from "../NeuMorph";
import * as Haptics from "expo-haptics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

type TControlPanel = {
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  number: number;
};

const ControlPanel = ({ setNumber, number }: TControlPanel): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false);
  const [horizontal, setHorizontal] = useState(0);

  const panGesture = Gesture.Pan()
    .onTouchesDown((e) => {
      runOnJS(setIsPressed)(true);
      Platform.OS !== "web" &&
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    })
    .onUpdate((e) => {
      const { translationX, velocityX } = e;
      console.log(e);
      runOnJS(setHorizontal)(translationX);
      console.log(Math.floor(translationX) % 5 === 0);
      if (Math.floor(translationX) % 5 === 0) {
        runOnJS(setNumber)(number + (velocityX > 0 ? 5 : -5));
      }
    })
    .onTouchesUp((e) => {
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
          ></NeuMorph>
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
  dotsContainer: {},
});

export default ControlPanel;
