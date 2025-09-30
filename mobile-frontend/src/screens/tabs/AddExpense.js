import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ExpenseContext } from "../../storage/ExpenseContext.js";

export default function AddExpense({ navigation }) {
  const { addExpense } = useContext(ExpenseContext);

  const [room, setRoom] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
  if (!room || !amount) {
    alert("Room and Amount are required!");
    return;
  }

  addExpense(room, {
    amount: parseFloat(amount),
    description,
    date: new Date().toISOString(),
  });

  alert("Expense Added!");

  // ✅ clear all input fields
  setRoom("");
  setAmount("");
  setDescription("");

  // Navigate back (optional, keep if you want to return to Home)
  navigation.goBack();
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Category (e.g. Travel, Food)"
        value={room}
        onChangeText={setRoom}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount (₹)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
