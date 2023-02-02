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
  style?: any;
  horizontal: number;
};
const NeuMorph = ({ children, style, isPressed, horizontal }: TNeuMorph) => {
  const [width, setWidth] = useState(0);
  // console.log(5 + (horizontal / width) * 20);
  // console.log("horizontal", horizontal);
  const topShadowStyle = isPressed
    ? {
        shadowOffset: {
          width: 5 + (horizontal / width) * 20,
          height: 5 + (horizontal / width) * 20,
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
          width: -5 - (horizontal / width) * 20,
          height: -5 - (horizontal / width) * 20,
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
          style={[
            styles.inner,
            {
              width: "100%",
              height: "100%",
              borderRadius: 50,
            },
            style,
          ]}
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
    backgroundColor: "#DEE9F7",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E2ECFD",
    borderWidth: 1,
  },
});
export default NeuMorph;
