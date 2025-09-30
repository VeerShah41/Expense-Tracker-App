import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]); // all expenses
  const [rooms, setRooms] = useState({}); // { roomName: [expense1, expense2...] }

  // Add an expense to a specific room
  const addExpense = (room, expense) => {
    const newExpense = {
      id: Date.now().toString(),
      room,
      ...expense, // amount, description, date
    };

    // add to expenses
    setExpenses((prev) => [...prev, newExpense]);

    // add to room
    setRooms((prev) => {
      const updatedRoomExpenses = prev[room] ? [...prev[room], newExpense] : [newExpense];
      return { ...prev, [room]: updatedRoomExpenses };
    });
  };

  // Delete an expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));

    // remove from rooms as well
    setRooms((prev) => {
      const updatedRooms = {};
      Object.keys(prev).forEach((room) => {
        updatedRooms[room] = prev[room].filter((e) => e.id !== id);
      });
      return updatedRooms;
    });
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
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
