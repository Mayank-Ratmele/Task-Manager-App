import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
} from "react-native";
import { router } from "expo-router";
import API from "../src/services/api";
import { AuthContext } from "../src/context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      await login(res.data.token);
      router.replace("/tasks" as any);
    } catch (error) {
      Alert.alert("Login Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => router.push("/register" as any)}>
        Create Account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100, gap: 12 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  input: { borderWidth: 1, padding: 12, borderRadius: 8 },
  link: { textAlign: "center", color: "blue", marginTop: 10 },
});