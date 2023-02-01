import React, { useCallback, useState } from "react";
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
};
const NeuMorph = ({ children, style, isPressed }: TNeuMorph) => {
  const topShadowStyle = isPressed
    ? {
        shadowOffset: {
          width: -5,
          height: -5,
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
          width: 5,
          height: 5,
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
