import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  PanResponder,
  Animated,
} from "react-native";
import NeuMorph from "../NeuMorph";
import * as Haptics from "expo-haptics";

type TSubmitButton = {};

const SubmitButton = (): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false);
  const [initial, setInitial] = useState(0);
  const [horizontal, setHorizontal] = useState(0);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    Platform.OS !== "web" &&
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [setIsPressed]);
  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, [setIsPressed]);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      handlePressIn();
    },
    onPanResponderRelease: () => {
      handlePressOut();
    },
    onPanResponderStart: (evt, { dx, x0 }) => {
      setInitial(x0);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { moveX } = gestureState;
      const dx = moveX - initial;
      setHorizontal(dx);
    },
  });
  return (
    <View style={styles.container}>
      <View
        style={{ width: "80%", height: "50%" }}
        {...panResponder.panHandlers}
      >
        <NeuMorph
          isPressed={isPressed}
          horizontal={horizontal}
          shadowOffset={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: "#DEE9F7",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default SubmitButton;
