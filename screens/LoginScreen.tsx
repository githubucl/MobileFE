import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Input, Image, Icon } from "@rneui/themed";
import { useThemeColor } from "../components/Themed";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const textColor = useThemeColor({ light: "#eee", dark: "#eee" }, "text");
  const onPressRegister = () => {
    navigation.navigate("Register");
  };
  const onJoinTable = () => {
    navigation.replace("Dashboard", { name, table });
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <AntDesign
          name="star"
          size={100}
          color="pink"
          style={{ height: 200 }}
        />
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Name"
          style={[{ color: textColor }, styles.input]}
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon={<AntDesign name="user" size={24} color="pink" />}
        />
        <Input
          style={[{ color: textColor }, styles.input]}
          placeholder="Table"
          value={table}
          onChangeText={(text) => setTable(text)}
          leftIcon={<Ionicons name="cash" size={24} color="pink" />}
        />
      </View>

      <Button
        title="Join table"
        style={{ marginTop: 30 }}
        icon={{
          name: "arrow-right",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        onPress={onJoinTable}
        iconRight
        iconContainerStyle={{ marginLeft: 10 }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(199, 43, 98, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
      <Button
        title="Register"
        style={{ marginTop: 30 }}
        icon={{
          name: "arrow-right",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        onPress={onPressRegister}
        iconRight
        iconContainerStyle={{ marginLeft: 10 }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(199, 43, 98, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
      <View style={{ height: 180 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  input: { padding: 10 },
  inputContainer: { width: 300 },
  button: { width: 200, marginTop: 10 },
});
