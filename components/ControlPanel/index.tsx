import React, { useState, useCallback } from "react";
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
  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    Platform.OS !== "web" &&
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [setIsPressed]);
  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, [setIsPressed]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      handlePressIn();
      return true;
    },
    onPanResponderRelease: (evt, gestureState) => {
      handlePressOut();
    },

    onPanResponderMove: (evt, gestureState) => {
      Platform.OS !== "web" &&
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      const { dx } = gestureState;
      setNumber((number) => number + dx * increment);
      setInput(number.toFixed(0).toString());
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {Platform.OS === "web" ? (
        <Neumorphism
          lightColor={"#FBFFFF"}
          darkColor={"#B7C4DD"}
          shapeType={"flat"}
          radius={50}
          style={{ width: "80%", height: "80%" }}
        />
      ) : (
        <NeuMorph style={styles.panel} isPressed={isPressed} />
      )}
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
