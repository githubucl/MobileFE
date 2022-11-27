import react, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import EditScreenInfo from "../components/EditScreenInfo";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ChatSection from "../components/ChatSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slider } from "@miblanchard/react-native-slider";
import socket from "../utils/socket";

export default function Dashboard({ navigation }) {
  const [input, setInput] = useState("");
  const [roomInfo, setRoomInfo] = useState({
    pot: 0,
    users: [],
  });
  const onSliderChange = (e) => {
    setInput(`${e[0].toFixed(0)}`);
    Platform.OS !== "web" &&
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
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
      console.log("hji", roomInfo);
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
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={200}
      >
        <View>
          <Text style={styles.poolAmount}>{roomInfo?.pot}</Text>
        </View>
        <ChatSection />

        <View style={styles.footer}>
          <TextInput
            keyboardType="numeric"
            value={input}
            onChangeText={textChangeHandler}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={submitHandler} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Slider
          value={Number(input)}
          onValueChange={onSliderChange}
          maximumValue={100}
          containerStyle={styles.input}
          minimumValue={-100}
          trackClickable={false}
          thumbTouchSize={styles.thumb}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  poolAmount: {
    padding: 10,
    width: "100%",
    textAlign: "center",
    // alignItems: "center",
    // justifyContent: "center",
    fontSize: 40,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  input: { width: "100%", height: 40 },
  thumb: { width: 1200, height: 40 },
});
