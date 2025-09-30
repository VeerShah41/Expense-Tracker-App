import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ScrollView, Dimensions } from "react-native";
import { ExpenseContext } from "../../storage/ExpenseContext.js";
import { LineChart } from "react-native-chart-kit";

export default function Home() {
  const { expenses, rooms, getOverallTotal, getRoomTotal, deleteExpense, addExpense } = useContext(ExpenseContext);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Prepare monthly totals
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyTotals = Array(12).fill(0);
  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();
    monthlyTotals[month] += e.amount;
  });

  // Handle edit submit
  const handleEditSubmit = () => {
    if (!editAmount) {
      Alert.alert("Error", "Amount is required");
      return;
    }
    const oldExpense = expenses.find((e) => e.id === editExpenseId);
    if (!oldExpense) return;

    deleteExpense(editExpenseId);

    addExpense(oldExpense.room, {
      id: editExpenseId,
      amount: parseFloat(editAmount),
      description: editDescription,
      date: oldExpense.date,
    });

    setEditExpenseId(null);
    setEditAmount("");
    setEditDescription("");
  };

  // Render room logs
  if (selectedRoom) {
    const roomExpenses = rooms[selectedRoom] || [];

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSelectedRoom(null)} style={styles.backBtn}>
          <Text style={styles.backText}>⬅ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{selectedRoom} Expenses</Text>
        <Text style={styles.total}>Room Total: ₹ {getRoomTotal(selectedRoom).toFixed(2)}</Text>

        {roomExpenses.length === 0 ? (
          <Text style={{ color: "#777" }}>No expenses in this room.</Text>
        ) : (
          <FlatList
            data={roomExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.expenseItem}>
                {editExpenseId === item.id ? (
                  <>
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
                    <TouchableOpacity style={styles.saveBtn} onPress={handleEditSubmit}>
                      <Text style={{ color: "#fff" }}>Save</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text>{item.description} - ₹{item.amount}</Text>
                    <View style={styles.actionBtns}>
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
                  </>
                )}
              </View>
            )}
          />
        )}
      </View>
    );
  }

  // Render Home with monthly chart
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monthly Expenses</Text>
      {expenses.length === 0 ? (
        <Text style={{ color: "#777", marginBottom: 20 }}>No expenses to visualize.</Text>
      ) : (
        <LineChart
          data={{
            labels: months,
            datasets: [{ data: monthlyTotals }]
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: "#f9f9f9",
            backgroundGradientFrom: "#f9f9f9",
            backgroundGradientTo: "#f9f9f9",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "4", strokeWidth: "2", stroke: "#007bff" }
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      )}

      <Text style={styles.title}>Overall Total Expense</Text>
      <Text style={styles.total}>₹ {getOverallTotal().toFixed(2)}</Text>

      <Text style={styles.subTitle}>Rooms</Text>
      {Object.keys(rooms).length === 0 ? (
        <Text style={{ color: "#777" }}>No rooms yet.</Text>
      ) : (
        Object.keys(rooms).map((room) => (
          <TouchableOpacity key={room} style={styles.roomCard} onPress={() => setSelectedRoom(room)}>
            <Text style={styles.roomName}>{room}</Text>
            <Text style={styles.roomTotal}>₹ {getRoomTotal(room).toFixed(2)}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subTitle: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },
  total: { fontSize: 20, fontWeight: "600", marginBottom: 20 },
  roomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  roomName: { fontSize: 16, fontWeight: "600" },
  roomTotal: { fontSize: 16, color: "#333" },
  expenseItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  actionBtns: { flexDirection: "row", marginTop: 5 },
  editBtn: { backgroundColor: "#007bff", padding: 5, borderRadius: 5, marginRight: 10 },
  deleteBtn: { backgroundColor: "#ff4d4d", padding: 5, borderRadius: 5 },
  backBtn: { marginBottom: 10 },
  backText: { color: "#007bff", fontSize: 16 },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#f5f5f5",
  },
  saveBtn: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
});
