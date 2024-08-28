import React from "react";
import {
  editExpenseData,
  sendExpenseList,
  setExpenseFormData,
} from "../../store/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = () => {
  const localId = useSelector((state) => state.Auth.localId);
  const expenseFormData = useSelector((state) => state.expense.expenseFormData);
  const updatedData = useSelector((state) => state.expense.expenseFormData);

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { value, name } = e.target;
    dispatch(setExpenseFormData({ ...expenseFormData, [name]: value }));
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      expenseFormData.amount.trim() === "" ||
      expenseFormData.description.trim().length === 0 ||
      expenseFormData.category.trim().length === 0
    ) {
      return;
    }

    if (expenseFormData.expenseId) {
      dispatch(
        editExpenseData(expenseFormData.expenseId, localId, updatedData)
      );
      toast.success("Expense Edited Sussesfully");
    } else {
      dispatch(sendExpenseList(expenseFormData, localId));
    }

    dispatch(
      setExpenseFormData({
        amount: "",
        description: "",
        category: "",
      })
    );
  };

  return (
    <form
      className="w-full max-w-lg p-6 bg-white border border-gray-200 dark:border-none  dark:bg-gray-700 dark:text-white shadow-md rounded-lg m-auto flex flex-col items-center"
      onSubmit={formSubmitHandler}
    >
      <h1 className="font-bold text-2xl m-auto my-3">Add Your Expenses</h1>
      <div className="w-full mb-4">
        <label
          htmlFor="amount"
          className="block text-gray-700 dark:text-white font-medium mb-1"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={expenseFormData.amount}
          onChange={changeHandler}
          className="w-full px-4 py-2 dark:bg-gray-700 dark:focus:ring-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 dark:text-white font-medium mb-1"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          name="description"
          value={expenseFormData.description}
          onChange={changeHandler}
          className="w-full px-4 py-2 dark:bg-gray-700 dark:focus:ring-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 dark:text-white font-medium mb-1"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={expenseFormData.category}
          onChange={changeHandler}
          className="w-full px-4 py-2 dark:bg-gray-700 dark:focus:ring-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a Category</option>
          <option value="Transportation">Transportation</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Food">Food</option>
          <option value="Savings & Investments">Savings & Investments</option>
          <option value="Clothes">Clothes</option>
          <option value="Education">Education</option>
          <option value="Housing">Housing</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
