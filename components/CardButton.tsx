import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const Card = ({ value, suit, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={selected ? styles.selectedCard : styles.card}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.suit}>{suit}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedCard: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  value: {
    fontSize: 24,
    textAlign: "center",
  },
  suit: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Card;
