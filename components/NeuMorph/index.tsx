import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";

type TNeuMorph = {
  children?: any;
  isPressed: boolean;
  horizontal: number;
};
const NeuMorph = ({ children, isPressed, horizontal }: TNeuMorph) => {
  const [width, setWidth] = useState(0);

  const topShadowStyle = isPressed
    ? {
        shadowOffset: {
          width: 5 + (horizontal / width) * 10,
          height: 5 + (horizontal / width) * 10,
        },
        shadowRadius: 6,
      }
    : {
        shadowOffset: {
          width: -25,
          height: -25,
        },
        shadowRadius: 12,
      };

  const bottomShadowStyle = isPressed
    ? {
        shadowOffset: {
          width: -5 - (horizontal / width) * 10,
          height: -5 - (horizontal / width) * 10,
        },
        shadowRadius: 6,
      }
    : {
        shadowOffset: {
          width: 25,
          height: 25,
        },
        shadowRadius: 12,
      };

  return (
    <View style={[styles.topShadow, topShadowStyle]}>
      <View style={[styles.bottomShadow, bottomShadowStyle]}>
        <View
          onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
          style={[styles.inner]}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topShadow: {
    width: "100%",
    height: "100%",

    shadowOpacity: 1,
    shadowColor: "#FBFFFF",
  },
  bottomShadow: {
    width: "100%",
    height: "100%",
    shadowOpacity: 1,
    shadowColor: "#B7C4DD",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  inner: {
    width: "100%",
    height: "100%",
    borderRadius: 50,

    backgroundColor: "#DEE9F7",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E2ECFD",
    borderWidth: 1,
  },
});
export default NeuMorph;
