import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ChatMessage from "./ChatMessage";
import { chats } from "../../data/chat";
import { Message } from "../../types";
import socket from "../../utils/socket";

const ChatSection = () => {
  const [message, setMessage] = useState<Message[] | []>([]);
  useEffect(() => {
    const messageHandler = (message) => {
      setMessage((prevMe) => [
        ...prevMe,
        {
          id: message.id,
          username: message.username,
          content: message.text,
          createdAt: message.createdAt,
        },
      ]);
    };
    socket.on("message", messageHandler);
    return () => {
      const clear = async () => {
        socket.off("message", messageHandler);
      };
      clear();
    };
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={message || chats}
        renderItem={({ item }) => {
          return <ChatMessage message={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "white",
    // height: 400,
  },
});

export default ChatSection;
