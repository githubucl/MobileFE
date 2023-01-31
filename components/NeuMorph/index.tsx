import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
type TNeuMorph = {
  children?: any;

  style?: any;
};
const NeuMorph = ({ children, style }: TNeuMorph) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, [setIsPressed]);
  const handlePressOut = useCallback(() => {}, []);
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.topShadow}>
        <View style={styles.bottomShadow}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
          >
            <View
              style={[
                styles.inner,
                {
                  width: "80%",
                  height: "80%",
                  borderRadius: 50,
                },
                style,
              ]}
            >
              {children}
            </View>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topShadow: {
    width: "100%",
    height: "100%",
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: "#FBFFFF",
  },
  bottomShadow: {
    width: "100%",
    height: "100%",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowColor: "#B7C4DD",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  inner: {
    backgroundColor: "#DEE9F7",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E2ECFD",
    borderWidth: 1,
  },
});
export default NeuMorph;
