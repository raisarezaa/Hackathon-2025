import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MapViewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🗺️ This is the map screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2E7D32",
  },
});
