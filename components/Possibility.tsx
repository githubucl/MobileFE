import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const SUITS = ["hearts", "diamonds", "clubs", "spades"];
const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const CardPicker = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const handleCardPress = (suit, rank) => {
    const newSelectedCards = [...selectedCards, { suit, rank }];
    setSelectedCards(newSelectedCards);
  };

  const renderCard = (suit, rank) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(suit, rank)}
      >
        <Text style={styles.cardText}>{rank}</Text>
        <Text style={styles.cardSuit}>{getSuitSymbol(suit)}</Text>
      </TouchableOpacity>
    );
  };

  const getSuitSymbol = (suit) => {
    switch (suit) {
      case "hearts":
        return "♥";
      case "diamonds":
        return "♦";
      case "clubs":
        return "♣";
      case "spades":
        return "♠";
      default:
        return "";
    }
  };

  const renderCardPickerModal = () => {
    return (
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Pick your cards</Text>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.cardsContainer}>
              {SUITS.map((suit) => RANKS.map((rank) => renderCard(suit, rank)))}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.selectedCardsText}>
          {selectedCards
            .map(({ suit, rank }) => `${rank}${getSuitSymbol(suit)}`)
            .join(" ")}
        </Text>
      </TouchableOpacity>
      {renderCardPickerModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedCardsText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    paddingBottom: 8,
    marginBottom: 8,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContent: {
    alignItems: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 50,
    height: 70,
    margin: 4,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
});

export default CardPicker;
