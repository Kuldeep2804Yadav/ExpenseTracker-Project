import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const expenseSlice = createSlice({
  name: "expense",
  initialState: { expenseList: [] },
  reducers: {
    addExpenseList(state, action) {
      state.expenseList.push(action.payload);
    },
    setExpenseList(state, action) {
      state.expenseList = action.payload;
    },
    editExpenseList(state, action) {
      // Implement editing logic here
    },
    deleteExpenseList(state, action) {
      const deleteId = action.payload;
      const newExpenseList = state.expenseList.filter(
        (expense) => expense.expenseId !== deleteId
      );
      state.expenseList = newExpenseList;
    },
  },
});

export const sendExpenseList = (expense, localId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://expanse-tracker-50dd1-default-rtdb.firebaseio.com/users/${localId}/expenses.json`,
        expense
      );

      if (response.status === 200) {
        const expenseId = response.data.name;
        dispatch(addExpenseList({ ...expense, expenseId }));
      }
    } catch (error) {
      console.error(
        "Error saving data to Firebase:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const fetchExpenseList = (localId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://expanse-tracker-50dd1-default-rtdb.firebaseio.com/users/${localId}/expenses.json`
      );
      const data = response.data;

      const expenses = [];
      for (let key in data) {
        expenses.push({ ...data[key], expenseId: key });
      }

      dispatch(setExpenseList(expenses));
    } catch (error) {
      console.error(
        "Error fetching data from Firebase:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const deleteExpenseData = (deleteId, localId) => {
  console.log(deleteId)
  return async (dispatch) => {
    try {
  
       await axios.delete(`https://expanse-tracker-50dd1-default-rtdb.firebaseio.com/users/${localId}/expenses/${deleteId}.json`);
      dispatch(deleteExpenseList(deleteId));
      console.log("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error.message);
    }
  };
};

export const { deleteExpenseList, setExpenseList, addExpenseList,editExpenseList } = expenseSlice.actions;
export default expenseSlice.reducer;
