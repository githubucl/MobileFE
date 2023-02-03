import react, { useRef, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import SubmitButton from "../components/SubmitButton";
import ChatSection from "../components/ChatSection";
import { SafeAreaView } from "react-native-safe-area-context";
import ControlPanel from "../components/ControlPanel";
import socket from "../utils/socket";

export default function Dashboard({ navigation }) {
  const [input, setInput] = useState("");
  const [roomInfo, setRoomInfo] = useState({
    pot: 0,
    users: [],
  });

  //get the name and table from the navigation params
  const { name, table } = navigation.getState().routes[0].params;

  const textChangeHandler = (text: string) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("please enter numbers only");
      }
    }
    setInput(newText);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("chipAction", input, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("message delitered");
    });
    setInput("");
  };

  useEffect(() => {
    socket.emit("join", { username: name, room: table }, (error: any) => {
      if (error) {
        alert(error);
        navigation.replace("Login");
      }
    });
  }, []);

  useEffect(() => {
    const potUpdateHandler = (roomInfo) => {
      setRoomInfo(roomInfo);
    };
    socket.on("potUpdate", potUpdateHandler);

    return () => {
      const clear = async () => {
        socket.off("message", potUpdateHandler);
      };
      clear();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.poolAmountSection}>
        <Text style={styles.poolAmountText}>{roomInfo?.pot}</Text>
      </View>

      <ChatSection />

      <SubmitButton />

      <ControlPanel setInput={setInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  poolAmountText: {
    padding: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 40,
  },
  poolAmountSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chatSection: {
    flex: 6,
  },
});
