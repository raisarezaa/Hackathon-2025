import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "./config"; // make sure this is defined in a config.js file

export default function CaregiverRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    patientName: "",
    patientAge: "",
    patientCondition: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "caregiver",
          address: form.address,
          patients: [
            {
              name: form.patientName,
              age: parseInt(form.patientAge),
              condition: form.patientCondition,
            },
          ],
        }),
      });

      if (res.ok) {
        Alert.alert("Success", "Account created successfully!");
        router.push("/mapView"); // ✅ use Expo Router for redirect
      } else {
        const err = await res.text();
        Alert.alert("Error", err || "Failed to create account");
      }
    } catch (e: any) {
      Alert.alert("Error", e.message || "Could not connect to backend");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Caregiver Account</Text>

      {/* Caregiver info */}
      <TextInput
        placeholder="Username"
        value={form.username}
        onChangeText={(v) => handleChange("username", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={form.phone}
        onChangeText={(v) => handleChange("phone", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(v) => handleChange("password", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={form.address}
        onChangeText={(v) => handleChange("address", v)}
        style={styles.input}
      />

      {/* Patient Info */}
      <Text style={styles.sectionTitle}>Patient Details</Text>
      <TextInput
        placeholder="Patient Name"
        value={form.patientName}
        onChangeText={(v) => handleChange("patientName", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Patient Age"
        keyboardType="numeric"
        value={form.patientAge}
        onChangeText={(v) => handleChange("patientAge", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Condition"
        value={form.patientCondition}
        onChangeText={(v) => handleChange("patientCondition", v)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#FCF3E0",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#B37747",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0C3A1",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    color: "#B37747",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#B37747",
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
