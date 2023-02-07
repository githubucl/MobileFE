import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NeuMorph from "../NeuMorph";

const PotSize = ({ pot }: { pot: number }) => {
  return (
    <View style={styles.poolAmountSection}>
      <Text style={styles.poolAmountText}>{pot}</Text>
    </View>
  );
};

export default PotSize;

const styles = StyleSheet.create({
  poolAmountText: {
    width: "100%",
    textAlign: "center",
    color: "#484D4C",
    fontWeight: "bold",
    fontSize: 50,
  },

  poolAmountSection: {
    backgroundColor: "#DEE9F7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
