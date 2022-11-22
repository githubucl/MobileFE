import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Input, Image, Icon, Text } from "@rneui/themed";
import { useThemeColor } from "../components/Themed";
import React, { useState, useLayoutEffect } from "react";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const textColor = useThemeColor(
    { light: "#eee", dark: "rgba(255,255,255,0.1)" },
    "text"
  );
  const onPressRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text h3 style={{ marginBottom: 50, color: textColor }}>
        Create an account
      </Text>
      <View style={styles.inputContainer}>
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
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon name="cash" type="ionicon" size={24} color="pink" />}
        />
        <Input
          style={[{ color: textColor }, styles.input]}
          placeholder="Password"
          value={passWord}
          type="password"
          onChangeText={(text) => setPassword(text)}
          leftIcon={<Icon name="cash" type="ionicon" size={24} color="pink" />}
        />
      </View>

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

export default RegisterScreen;

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
