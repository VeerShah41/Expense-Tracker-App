import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ExpenseContext } from "../storage/ExpenseContext.js";

export default function SettingsScreen() {
  const { clearAllExpenses } = useContext(ExpenseContext);

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Expenses",
      "Are you sure you want to delete all expenses? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Clear", style: "destructive", onPress: () => clearAllExpenses() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.button} onPress={handleClearAll}>
        <Text style={styles.buttonText}>Clear All Expenses</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
