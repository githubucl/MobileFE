import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Platform, PanResponder } from "react-native";
import NeuMorph from "../NeuMorph";
import * as Haptics from "expo-haptics";
import Neumorphism from "react-native-neumorphism";

type TControlPanel = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

const ControlPanel = ({ setInput }: TControlPanel): JSX.Element => {
  const [increment, setIncrement] = useState(1);
  const [number, setNumber] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  useEffect(() => {
    Platform.OS !== "web" &&
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [number]);
  const [horizontal, setHorizontal] = useState(0);
  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    Platform.OS !== "web" &&
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [setIsPressed]);
  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, [setIsPressed]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      handlePressIn();
    },
    onPanResponderRelease: (evt, gestureState) => {
      handlePressOut();
    },

    onPanResponderMove: (evt, gestureState) => {
      const { dx } = gestureState;
      console.log("dx", dx);
      setHorizontal(dx);
      setNumber((number) => number + dx * increment);
      setInput(number.toFixed(0).toString());
    },
  });

  return (
    <View style={styles.container}>
      <View
        {...panResponder.panHandlers}
        style={{ width: "80%", height: "80%" }}
      >
        {Platform.OS === "web" ? (
          <Neumorphism
            lightColor={"#FBFFFF"}
            darkColor={"#B7C4DD"}
            shapeType={"flat"}
            radius={50}
          />
        ) : (
          <NeuMorph
            style={styles.panel}
            isPressed={isPressed}
            horizontal={horizontal}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    height: "100%",
    backgroundColor: "#DEE9F7",
    alignItems: "center",
    justifyContent: "center",
  },

  panelContainer: {
    // height: "80%",
    // width: "80%",
  },
  panel: {},
});

export default ControlPanel;
