import React from "react";
import { Text, View } from "../../Themed";
import { Message } from "../../../types";
import moment from "moment";
import { StyleSheet } from "react-native";
export type ChatMessageProps = {
  message: Message;
};
const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.messageBox}>
          {`${message.username} ${message.content} at ${moment(
            message.createdAt
          ).fromNow()}`}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  messageBox: {
    flex: 6,
    color: "#484D4C",
    fontWeight: "bold",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#DEE9F7",
  },
});
export default ChatMessage;
