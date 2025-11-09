import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function StartScreen() {
  return (
    <View style={styles.container}>
      {/* Logo inside green circle */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/images/react-logo.png")} // change if your image has another name
          style={styles.logo}
        />
      </View>

      {/* App name */}
      <Text style={styles.title}>InnerCircle</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("/(tabs)/login")} // goes to your existing login screen
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("/(tabs)/create_acct")} // or whatever your register screen name is
      >
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAEEDC", // beige background
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoWrapper: {
    backgroundColor: "#DDE7C7", // green circle background
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#B37B53", // brown text
    marginBottom: 40,
  },
  button: {
    width: "80%",
    backgroundColor: "#B37B53",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
  secondaryButton: {
    backgroundColor: "#B37B53", // you can lighten later
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
