import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { API_URL } from "./config"; // same as before
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 💡 your original working POST logic (unchanged)
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
      const msg = error instanceof Error ? error.message : "Unknown error";
      Alert.alert("Error", `Could not connect: ${msg}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Circular Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/images/react-logo.png")} // change later to your real logo
          style={styles.logo}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Sign In</Text>

      {/* Username Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Optional Forgot Password */}
      <TouchableOpacity onPress={() => Alert.alert("Password reset coming soon!")}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAEEDC", // beige Figma bg
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoWrapper: {
    backgroundColor: "#DDE7C7", // soft green circle
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#B37B53", // warm brown text
    marginBottom: 25,
  },
  input: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
  },
  button: {
    width: "85%",
    backgroundColor: "#B37B53",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: "#B37B53",
    textDecorationLine: "underline",
  },
});
