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


  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyTotals = Array(12).fill(0);
  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();
    monthlyTotals[month] += e.amount;
  });


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


  if (selectedRoom) {
    const roomExpenses = rooms[selectedRoom] || [];

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSelectedRoom(null)} style={styles.backBtn}>
          <Text style={styles.backText}>  {"<-  Back"}</Text>
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
                  <View style={styles.editRow}>
                    <View style={{ flex: 1, marginRight: 10 }}>
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
                    </View>
                    <TouchableOpacity style={styles.saveBtn} onPress={handleEditSubmit}>
                      <Text style={{ color: "#fff" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.expenseRow}>
                    <Text style={{ flex: 1 }}>{item.description} - ₹{item.amount}</Text>
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
                  </View>
                )}
              </View>
            )}
          />

        )}
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.overallTotalContainer}>
      <Text style={styles.title}>Overall Total Expense</Text>
      <Text style={styles.total}>₹ {getOverallTotal().toFixed(2)}</Text>
      </View>
      <View style={styles.chartContainer}>
      <Text style={styles.title}>Monthly Expenses</Text>
      {expenses.length === 0 ? (
        <Text style={{ color: "#777", marginBottom: 20 }}>No expenses to visualize.</Text>
      ) : (
        <LineChart
          data={{
            labels: months,
            datasets: [{ data: monthlyTotals }]
          }}
          width={Dimensions.get("window").width - 70}
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
      </View>
      
      <View>
        <Text style={styles.subTitle}>Expanse logs</Text>
        <Text style={{ color: "#777", fontSize: 12, marginBottom: 8 }}>
          Tap on a log to edit or delete an expense
        </Text>

        {Object.keys(rooms).length === 0 ? (
          <Text style={{ color: "#777" }}>No Category yet.</Text>
        ) : (
          Object.keys(rooms).map((room) => (
            <TouchableOpacity
              key={room}
              style={styles.roomCard}
              onPress={() => setSelectedRoom(room)}
            >
              <Text style={styles.roomName}>{room}</Text>
              <Text style={styles.roomTotal}>₹ {getRoomTotal(room).toFixed(2)}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f4f7",
  },


  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },


  total: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#007bff",
  },


  roomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#ffffff", 
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  roomName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  roomTotal: {
    fontSize: 16,
    color: "#555",
  },


  expenseItem: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    flexDirection: "column", 
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionBtns: {
    flexDirection: "row",
    marginTop: 5,
  },
  editBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  backBtn: {
    marginBottom: 12,
  },
  backText: {
    color: "#007bff",
    fontSize: 16,
  },

  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  saveBtn: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },

  overallTotalContainer: {
    backgroundColor: "#e8f0fe",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
});
