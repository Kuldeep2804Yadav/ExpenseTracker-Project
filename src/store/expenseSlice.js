import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenseList: [],
    expenseFormData: {
      amount: "",
      description: "",
      category: "",
    },
    totalAmount: 0,
  },
  reducers: {
    setExpenseFormData(state, action) {
      state.expenseFormData = action.payload;
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload.reduce(
        (amount, item) => Number(item.amount) + amount,
        0
      );
    },
    addExpenseList(state, action) {
      state.expenseList.push(action.payload);
    },
    setExpenseList(state, action) {
      state.expenseList = action.payload;
    },
    editExpenseList(state, action) {
      const editedDataId = action.payload;
      const editData = state.expenseList.find(
        (expense) => expense.expenseId === editedDataId
      );
      state.expenseFormData = editData || state.expenseFormData;
    },
    deleteExpenseList(state, action) {
      state.expenseList = state.expenseList.filter(
        (expense) => expense.expenseId !== action.payload
      );
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
        toast.success("Expense Added Successfully.")
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Something Went Wrong !! Please Try again.";
        toast.error(errorMessage);
       
      } else if (error.request) {
        toast.error(
          "Network error: No response received. Please check your internet connection."
        );
      } else {
        toast.error("Error:", error.message);
        
      }
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

      const expenses = Object.keys(data || {}).map((key) => ({
        ...data[key],
        expenseId: key,
      }));
      dispatch(setExpenseList(expenses));
    }  catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Something Went Wrong !! Please Try again.";
        toast.error(errorMessage);
       
      } else if (error.request) {
        toast.error(
          "Network error: No response received. Please check your internet connection."
        );
      } else {
        toast.error("Error:", error.message);
        
      }
    }
  };
};

export const deleteExpenseData = (deleteId, localId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://expanse-tracker-50dd1-default-rtdb.firebaseio.com/users/${localId}/expenses/${deleteId}.json`
      );
      dispatch(deleteExpenseList(deleteId));
      toast.success("Expense deleted successfully");
    }  catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Something Went Wrong !! Please Try again.";
        toast.error(errorMessage);
       
      } else if (error.request) {
        toast.error(
          "Network error: No response received. Please check your internet connection."
        );
      } else {
        toast.error("Error:", error.message);
        
      }
    }
  };
};

export const editExpenseData = (expenseId, localId, updateData) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `https://expanse-tracker-50dd1-default-rtdb.firebaseio.com/users/${localId}/expenses/${expenseId}.json`,
        updateData
      );
      dispatch(fetchExpenseList(localId));

    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Something Went Wrong !! Please Try again.";
        toast.error(errorMessage);
       
      } else if (error.request) {
        toast.error(
          "Network error: No response received. Please check your internet connection."
        );
      } else {
        toast.error("Error:", error.message);
        
      }
    }
  };
};

export const {
  setExpenseFormData,
  deleteExpenseList,
  setExpenseList,
  addExpenseList,
  editExpenseList,
  setTotalAmount,
} = expenseSlice.actions;

export default expenseSlice.reducer;
