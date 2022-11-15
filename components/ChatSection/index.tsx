import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "../Themed";
import ChatMessage from "./ChatMessage";

import { chats } from "../../data/chat";
const ChatSection = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return <ChatMessage message={item} />;
        }}
      />
      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    height: 400,
  },
});

export default ChatSection;
