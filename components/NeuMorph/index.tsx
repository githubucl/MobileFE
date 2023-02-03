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
  shadowOffset: number;
};
const NeuMorph = ({
  children,
  isPressed,
  horizontal,
  shadowOffset,
}: TNeuMorph) => {
  const [width, setWidth] = useState(0);

  const topShadowStyle = isPressed
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
      };

  const bottomShadowStyle = isPressed
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
      };

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
  return (
    <View style={[styles.topShadow, topShadowStyle, webTopShadowStyle]}>
      <View
        style={[styles.bottomShadow, bottomShadowStyle, webBottomShadowStyle]}
      >
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
    elevation: 3,
    shadowOpacity: 1,
    borderRadius: 50,

    shadowColor: "#FBFFFF",
  },
  bottomShadow: {
    width: "100%",
    elevation: 3,
    borderRadius: 50,
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
