import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ChatMessage from "./ChatMessage";
import { chats } from "../../data/chat";
import { Message } from "../../types";
import socket from "../../utils/socket";

const ChatSection = () => {
  const [message, setMessage] = useState<Message[] | []>([]);
  useEffect(() => {
    const messageHandler = (message: Message) => {
      setMessage((prevMe) => [
        ...prevMe,
        {
          id: message.id,
          username: message.username,
          content: message.content,
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
      <View style={styles.chatContainer}>
        <FlatList
          data={message || chats}
          renderItem={({ item }) => {
            return <ChatMessage message={item} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#DEE9F7",
  },
  chatContainer: {
    width: "80%",
    height: "100%",
  },
});

export default ChatSection;
