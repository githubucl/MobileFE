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

type TControlPanel = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

const ControlPanel = ({ setInput }: TControlPanel): JSX.Element => {
  const [increment, setIncrement] = useState(5);
  const [number, setNumber] = useState(0);

  const [isPressed, setIsPressed] = useState(false);
  const [initial, setInitial] = useState(0);
  useEffect(() => {
    // Platform.OS !== "web" &&
    //   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [number]);
  const [horizontal, setHorizontal] = useState(0);
  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    Platform.OS !== "web" &&
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [setIsPressed]);
  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    setHorizontal(0);
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

      setNumber((number) => number + (dx / 100) * increment);

      setInput(number.toFixed(0).toString());
    },
  });

  return (
    <View style={styles.container}>
      <View
        {...panResponder.panHandlers}
        style={{ width: "80%", height: "60%", marginTop: 20 }}
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
    flex: 3,
    backgroundColor: "#DEE9F7",
    alignItems: "center",
    // justifyContent: "center",
  },
});

export default ControlPanel;
