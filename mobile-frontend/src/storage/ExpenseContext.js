import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]); // all expenses
  const [rooms, setRooms] = useState({}); // { roomName: [expense1, expense2...] }

  // Load expenses from AsyncStorage on mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem("@expenses");
        if (storedExpenses) {
          const parsed = JSON.parse(storedExpenses);
          setExpenses(parsed);

          // rebuild rooms
          const newRooms = {};
          parsed.forEach((e) => {
            if (!newRooms[e.room]) newRooms[e.room] = [];
            newRooms[e.room].push(e);
          });
          setRooms(newRooms);
        }
      } catch (e) {
        console.error("Failed to load expenses:", e);
      }
    };
    loadExpenses();
  }, []);
  // Inside ExpenseProvider

const clearAllExpenses = async () => {
  try {
    await AsyncStorage.removeItem("@expenses"); // clear AsyncStorage
    setExpenses([]); // reset state
    setRooms({});
  } catch (e) {
    console.error("Failed to clear expenses:", e);
  }
};

  // Save expenses to AsyncStorage
  const saveExpenses = async (newExpenses) => {
    try {
      await AsyncStorage.setItem("@expenses", JSON.stringify(newExpenses));
    } catch (e) {
      console.error("Failed to save expenses:", e);
    }
  };

  // Add an expense to a specific room
  const addExpense = (room, expense) => {
    const newExpense = {
      id: Date.now().toString(),
      room,
      ...expense, // amount, description, date
    };

    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);

    setRooms((prev) => {
      const updatedRoomExpenses = prev[room] ? [...prev[room], newExpense] : [newExpense];
      return { ...prev, [room]: updatedRoomExpenses };
    });

    saveExpenses(newExpenses);
  };

  // Delete an expense
  const deleteExpense = (id) => {
    const newExpenses = expenses.filter((e) => e.id !== id);
    setExpenses(newExpenses);

    const updatedRooms = {};
    Object.keys(rooms).forEach((room) => {
      updatedRooms[room] = rooms[room].filter((e) => e.id !== id);
    });
    setRooms(updatedRooms);

    saveExpenses(newExpenses);
  };

  // Get overall total
  const getOverallTotal = () => {
    return expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  };

  // Get room-wise total
  const getRoomTotal = (room) => {
    if (!rooms[room]) return 0;
    return rooms[room].reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  };

  return (
    <ExpenseContext.Provider
  value={{
    expenses,
    rooms,
    addExpense,
    deleteExpense,
    getOverallTotal,
    getRoomTotal,
    clearAllExpenses, // <- add this
  }}
>
  {children}
</ExpenseContext.Provider>

  );
};
