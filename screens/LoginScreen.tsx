import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image, Icon } from "@rneui/themed";
import { useThemeColor } from "../components/Themed";
import React, { useState } from "react";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const textColor = useThemeColor(
    { light: "#eee", dark: "rgba(255,255,255,0.1)" },
    "text"
  );

  const onJoinTable = () => {
    console.warn("Join Table");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon
          name="skull-outline"
          type="ionicon"
          size={100}
          color="pink"
          style={{ height: 200 }}
        />
        <Input
          placeholder="Name"
          style={[{ color: textColor }, styles.input]}
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon={
            <Icon
              name="person-circle-outline"
              type="ionicon"
              size={24}
              color="pink"
            />
          }
        />
        <Input
          style={[{ color: textColor }, styles.input]}
          placeholder="Table"
          value={table}
          onChangeText={(text) => setTable(text)}
          leftIcon={<Icon name="cash" type="ionicon" size={24} color="pink" />}
        />
      </View>

      <Button
        title="PROFILE"
        icon={{
          name: "user",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
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
      <View style={{ height: 100 }} />
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
