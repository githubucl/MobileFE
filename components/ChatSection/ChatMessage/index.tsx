import React from "react";
import { Text, View } from "../../Themed";
import { Message } from "../../../types";
import moment from "moment";
import styles from "./styles";
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

export default ChatMessage;
