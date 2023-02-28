import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type TNeuMorph = {
  children?: any;
  isPressed: boolean;
  horizontal: number;
  shadowOffset: number;
  borderRadius?: number;
};
const NeuMorph = ({
  children,
  isPressed,
  horizontal,
  shadowOffset,
  borderRadius,
}: TNeuMorph) => {
  const [width, setWidth] = useState(0);

  const topShadowStyle = [
    isPressed
      ? {
          shadowOffset: {
            width: 5 + (horizontal / width) * 5,
            height: 5 + (horizontal / width) * 5,
          },
          shadowRadius: 6,

          elevation: 1,
        }
      : {
          shadowOffset: {
            width: -shadowOffset,
            height: -shadowOffset,
          },

          shadowRadius: 12,
        },
    borderRadius ? { borderRadius: borderRadius } : { borderRadius: 50 },
  ];

  const bottomShadowStyle = [
    isPressed
      ? {
          shadowOffset: {
            width: -5 - (horizontal / width) * 5,
            height: -5 - (horizontal / width) * 5,
          },
          shadowRadius: 6,

          elevation: 1,
        }
      : {
          shadowOffset: {
            width: shadowOffset,
            height: shadowOffset,
          },

          shadowRadius: 12,
        },
    borderRadius ? { borderRadius: borderRadius } : { borderRadius: 50 },
  ];

  const webTopShadowStyle =
    Platform.OS === "web"
      ? {
          shadowColor: "#FBFFFF",
        }
      : {};
  const webBottomShadowStyle =
    Platform.OS === "web"
      ? {
          shadowColor: "#B7C4DD",
        }
      : {};

  const linearGradient = [
    borderRadius ? { borderRadius: borderRadius } : { borderRadius: 50 },
  ];
  return (
    <View style={[styles.topShadow, topShadowStyle, webTopShadowStyle]}>
      <View
        style={[styles.bottomShadow, bottomShadowStyle, webBottomShadowStyle]}
      >
        <View
          onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
          style={[styles.inner]}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#E2ECFD", "#e4edfb"]}
            style={[styles.linearGradient, linearGradient]}
            start={[0.3, 0.4]}
            // end={[0.2, 0.8]}
          >
            {children}
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  topShadow: {
    width: "100%",
    height: "100%",
    elevation: 3,
    shadowOpacity: 1,
    shadowColor: "#FBFFFF",
  },
  bottomShadow: {
    width: "100%",
    elevation: 3,
    height: "100%",
    shadowOpacity: 1,
    shadowColor: "#B7C4DD",
  },
  inner: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#DEE9F7",
    borderColor: "#E2ECFD",
    // borderWidth: 1,
  },
  childrenContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default NeuMorph;
