import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PanResponder,
  Animated,
} from "react-native";
import NeuMorph from "../NeuMorph";
import * as Haptics from "expo-haptics";

type TSubmitButton = {
  number: number;
  submitHandler: () => void;
};

const SubmitButton = ({
  number,
  submitHandler,
}: TSubmitButton): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false);
  const [initial, setInitial] = useState(0);
  const [horizontal, setHorizontal] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setIsPressed(true);
      Platform.OS !== "web" &&
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
    onPanResponderRelease: () => {
      setIsPressed(false);
      submitHandler();
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
          borderRadius={15}
        >
          <Text style={styles.text}>{`${
            number > 0 ? "Bet" : "Take"
          } ${number} dollars`}</Text>
        </NeuMorph>
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
    // flexDirection: "row",
  },
  text: {
    color: "#484D4C",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SubmitButton;
