import react, { useRef, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import SubmitButton from "../components/SubmitButton";
import ChatSection from "../components/ChatSection";
import { SafeAreaView } from "react-native-safe-area-context";
import ControlPanel from "../components/ControlPanel";
import PotSize from "../components/PotSize";
import socket from "../utils/socket";
import { RoomInfo } from "../types";

export default function Dashboard({ navigation }) {
  const [number, setNumber] = useState(0);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    pot: 0,
    users: [],
  });

  //get the name and table from the navigation params
  const { name, table } = navigation.getState().routes[0].params;

  const submitHandler = () => {
    socket.emit("chipAction", number, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("message delitered");
    });
    setNumber(0);
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
    const potUpdateHandler = (roomInfo: RoomInfo) => {
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

  useEffect(() => {
    Platform.OS !== "web" && Haptics.selectionAsync();
  }, [number]);
  return (
    <View style={{ flex: 1 }}>
      <PotSize pot={roomInfo?.pot} />
      <ChatSection />

      <SubmitButton number={number} submitHandler={submitHandler} />

      <ControlPanel setNumber={setNumber} />
    </View>
  );
}

const styles = StyleSheet.create({});
