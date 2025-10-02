// import React, { useContext } from "react";
// import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
// import { ExpenseContext } from "../../storage/ExpenseContext.js";
// import { LineChart, PieChart } from "react-native-chart-kit";

// export default function Visualise() {
//   const { expenses, rooms, getRoomTotal } = useContext(ExpenseContext);

//   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

//   // Monthly totals
//   const monthlyTotals = Array(12).fill(0);
//   expenses.forEach((e) => {
//     const month = new Date(e.date).getMonth();
//     monthlyTotals[month] += e.amount;
//   });

//   // Predefined color palette
//   const colors = [
//     "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
//     "#FF9F40", "#C9CBCF", "#FF6384", "#36A2EB", "#FFCE56",
//   ];

//   // Pie chart data for react-native-chart-kit
//   const pieData = Object.keys(rooms).map((room, idx) => ({
//     name: room,
//     population: getRoomTotal(room),
//     color: colors[idx % colors.length],
//     legendFontColor: "#333",
//     legendFontSize: 14,
//   }));

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Monthly Expenses</Text>
//       {expenses.length === 0 ? (
//         <Text style={{ color: "#777", marginBottom: 20 }}>No expenses to visualize.</Text>
//       ) : (
//         <LineChart
//           data={{
//             labels: months,
//             datasets: [{ data: monthlyTotals }]
//           }}
//           width={Dimensions.get("window").width - 40}
//           height={220}
//           yAxisLabel="₹"
//           chartConfig={{
//             backgroundColor: "#f9f9f9",
//             backgroundGradientFrom: "#f9f9f9",
//             backgroundGradientTo: "#f9f9f9",
//             decimalPlaces: 0,
//             color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
//             style: { borderRadius: 16 },
//             propsForDots: { r: "4", strokeWidth: "2", stroke: "#007bff" }
//           }}
//           style={{ marginVertical: 8, borderRadius: 16 }}
//         />
//       )}

//       <Text style={styles.title}>Expenses by Room (Pie Chart)</Text>
//       {pieData.length === 0 ? (
//         <Text style={{ color: "#777" }}>No expenses to show.</Text>
//       ) : (
//         <PieChart
//           data={pieData}
//           width={Dimensions.get("window").width - 40}
//           height={220}
//           chartConfig={{
//             color: (opacity = 1) => `rgba(0,0,0,${opacity})`
//           }}
//           accessor="population"
//           backgroundColor="transparent"
//           paddingLeft="15"
//           absolute
//         />
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, marginTop: 20 },
// });
