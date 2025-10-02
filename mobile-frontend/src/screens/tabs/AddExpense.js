import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { ExpenseContext } from "../../storage/ExpenseContext.js";

export default function AddExpense({ navigation }) {
  const { expenses, rooms, addExpense, deleteExpense } = useContext(ExpenseContext);

  const [room, setRoom] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");


  const handleSubmit = () => {
    if (!room || !amount) {
      alert("Room and Amount are required!");
      return;
    }

    addExpense(room, {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString(),
    });

    alert("Expense Added!");
    setRoom("");
    setAmount("");
    setDescription("");
    navigation.goBack();
  };


  const handleEditSubmit = (oldExpense) => {
    if (!editAmount) {
      alert("Amount is required!");
      return;
    }

    deleteExpense(oldExpense.id);
    addExpense(oldExpense.room, {
      id: oldExpense.id,
      amount: parseFloat(editAmount),
      description: editDescription,
      date: oldExpense.date,
    });

    setEditExpenseId(null);
    setEditAmount("");
    setEditDescription("");
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

  
      <Text style={styles.logsTitle}>Expense Logs</Text>
      {/* <Text style={{ fontSize: 12, color: "#777", marginBottom: 10 }}>
        Tap edit or delete to manage logs
      </Text> */}

      {expenses.length === 0 ? (
        <Text style={{ color: "#777" }}>No expenses yet.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              {editExpenseId === item.id ? (
                <View style={styles.editRow}>
                  <TextInput
                    style={styles.editInput}
                    value={editAmount}
                    keyboardType="numeric"
                    onChangeText={setEditAmount}
                    placeholder="Amount"
                  />
                  <TextInput
                    style={styles.editInput}
                    value={editDescription}
                    onChangeText={setEditDescription}
                    placeholder="Description"
                  />
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => handleEditSubmit(item)}
                  >
                    <Text style={{ color: "#fff" }}>Save</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.expenseRow}>
                  <Text style={{ flex: 1 }}>
                    {item.room} | {item.description} - ₹{item.amount}
                  </Text>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => {
                      setEditExpenseId(item.id);
                      setEditAmount(item.amount.toString());
                      setEditDescription(item.description);
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteExpense(item.id)}
                  >
                    <Text style={{ color: "#fff" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
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

  logsTitle: { fontSize: 20, fontWeight: "600", marginTop: 30, marginBottom: 10 },

  expenseItem: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editRow: { flexDirection: "column" },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
    backgroundColor: "#f9f9f9",
  },
  editBtn: {
    backgroundColor: "#007bff",
    padding: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    padding: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  saveBtn: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 6,
  },
});
