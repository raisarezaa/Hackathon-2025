import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { API_URL } from "./config";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.text();
      Alert.alert("Server says:", result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      Alert.alert("Error", `Could not connect to backend: ${errorMessage}`);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email: `${username}@gmail.com`,
          phone: "1234567890",
          password,
          role: "caretaker",
        }),
      });
      const result = await response.text();
      Alert.alert("Server says:", result);
    } catch (error) {
      Alert.alert("Error", "Could not connect to backend");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Tracker Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, color: "#333" },
  input: { width: "80%", backgroundColor: "white", padding: 12, borderRadius: 10, marginVertical: 10, borderWidth: 1, borderColor: "#ccc" },
  button: { width: "80%", backgroundColor: "#007AFF", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  signupButton: { backgroundColor: "#34C759" },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
});
