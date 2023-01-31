import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PanResponder,
  Image,
} from "react-native";
import NeuMorph from "../NeuMorph";
import * as Haptics from "expo-haptics";
import Neumorphism from "react-native-neumorphism";
import { Shadow } from "react-native-neomorph-shadows";
type TControlPanel = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

const ControlPanel = ({ setInput }: TControlPanel): JSX.Element => {
  const [increment, setIncrement] = useState(1);
  const [number, setNumber] = useState(0);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dx } = gestureState;
      if (Math.abs(dx) > 10) {
        return true;
      }
      return false;
    },
    onPanResponderMove: (evt, gestureState) => {
      Platform.OS !== "web" &&
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        ></Neumorphism>
      ) : (
        <NeuMorph style={styles.panel} />
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
