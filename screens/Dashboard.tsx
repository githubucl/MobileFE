import react, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as Haptics from "expo-haptics";
import EditScreenInfo from "../components/EditScreenInfo";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ChatSection from "../components/ChatSection";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";

export default function Dashboard({}) {
  const [input, setInput] = useState("");
  const sendMessage = () => {};
  const onSliderChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={200}
      >
        <TouchableWithoutFeedback>
          <>
            <View>
              <Text style={styles.poolAmount}>1000000 $</Text>
            </View>
            <ChatSection />
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Slider
              tapToSeek
              onValueChange={onSliderChange}
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          </>
        </TouchableWithoutFeedback>
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
});
