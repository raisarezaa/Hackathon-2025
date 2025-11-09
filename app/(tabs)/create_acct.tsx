import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CreateAccount() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Account Type</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/caregiverRegister")}>
        <Text style={styles.buttonText}>Caregiver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#FAEEDC"},
  title:{fontSize:20,color:"#B37B53",marginBottom:20,fontWeight:"600"},
  button:{backgroundColor:"#B37B53",padding:15,borderRadius:10},
  buttonText:{color:"#fff",fontWeight:"600"}
});
