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
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

const ControlPanel = ({ setNumber }: TControlPanel): JSX.Element => {
  const [increment, setIncrement] = useState(5);

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
      setHorizontal(0);
    },
    onPanResponderStart: (evt, { dx, x0 }) => {
      setInitial(x0);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { moveX, dx } = gestureState;
      const moved = moveX - initial;
      setHorizontal(moved);

      setNumber((number) => Math.floor(number + dx / 2));
    },
  });

  // const dotsRow = () => {
  //   return (
  //     <View style={styles.row}>
  //       <View style={{ width: 5, height: 5 }}>
  //         <NeuMorph isPressed={true} horizontal={0} shadowOffset={5} />
  //       </View>
  //       <View style={{ width: 5, height: 5 }}>
  //         <NeuMorph isPressed={true} horizontal={0} shadowOffset={5} />
  //       </View>
  //       <View style={{ width: 5, height: 5 }}>
  //         <NeuMorph isPressed={true} horizontal={0} shadowOffset={5} />
  //       </View>
  //     </View>
  //   );
  // };
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
        >
          {/* <View style={styles.dotsContainer}>{dotsRow()}</View>
          <View style={styles.dotsContainer}>{dotsRow()}</View>
          <View style={styles.dotsContainer}>{dotsRow()}</View> */}
        </NeuMorph>
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
  dotsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  dot: {
    backgroundColor: "grey",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default ControlPanel;
