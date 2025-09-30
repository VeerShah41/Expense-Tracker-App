import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ExpenseContext } from "../storage/ExpenseContext.js";

export default function Profile() {
  const { getOverallTotal, rooms, getRoomTotal } = useContext(ExpenseContext);

  // Static user info (can later make dynamic)
  const user = {
    name: "Persolan",
    email: "personal123@example.com",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Total Expenses:</Text>
        <Text style={styles.value}>₹ {getOverallTotal().toFixed(2)}</Text>
      </View>

      <Text style={styles.subTitle}>Room-wise Expenses</Text>
      {Object.keys(rooms).length === 0 ? (
        <Text style={{ color: "#777" }}>No rooms yet.</Text>
      ) : (
        <FlatList
          data={Object.keys(rooms)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>{item}</Text>
              <Text style={styles.value}>₹ {getRoomTotal(item).toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subTitle: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  label: { fontSize: 16, fontWeight: "600" },
  value: { fontSize: 16, color: "#333", marginTop: 5 },
});
