import react, { useRef, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";

import { Text, View } from "../components/Themed";
import SubmitButton from "../components/SubmitButton";
import ChatSection from "../components/ChatSection";

import ControlPanel from "../components/ControlPanel";
import PotSize from "../components/PotSize";
import socket from "../utils/socket";
import { RoomInfo, UserInfo } from "../types";
import { calculateEquity } from "poker-odds";
export default function Dashboard({ navigation }) {
  const [number, setNumber] = useState(5);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    pot: 0,
    users: [],
    highestBet: 0,
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
    setNumber(5);
  };

  useEffect(() => {
    socket.emit("join", { username: name, room: table }, (error: any) => {
      if (error) {
        alert(error);
        navigation.replace("Login");
      }
    });
  }, []);
  const hands = [
    ["As", "Kh"],
    // ["Kd", "Qs"],
  ];
  const board = ["Td", "7s", "8d", "8h"];
  const iterations = 100000; // optional
  const exhaustive = false; // optional

  console.log(
    "calculateEquity(hands, board, iterations, exhaustive);",
    calculateEquity(hands, board, iterations, exhaustive)
  );
  useEffect(() => {
    const potUpdateHandler = (roomInfo: RoomInfo) => {
      setRoomInfo(roomInfo);

      setNumber(
        roomInfo.highestBet -
          roomInfo.users.filter((user: UserInfo) => {
            return user.username === name;
          })?.[0]?.roundBet || 0
      );
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
