import React, { useState } from "react";
import { sendExpenseList } from "../../store/expenseSlice";
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = () => {
  //const idToken = useSelector((state) => state.Auth.idToken);
  const localId=useSelector((state)=> state.Auth.localId);

  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setExpenseForm({ ...expenseForm, [name]: value });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      expenseForm.amount.trim() === "" ||
      expenseForm.description.trim().length === 0 ||
      expenseForm.category.trim().length === 0
    ) {
      return;
    }

    // const expense = {
    //   amount: parseFloat(expenseForm.amount),
    //   description: expenseForm.description.trim(),
    //   category: expenseForm.category.trim(),
    // };

    dispatch(sendExpenseList(expenseForm, localId));
   
    setExpenseForm({
      amount: "",
      description: "",
      category: "",
    });
  };

  return (
    <form
      className="w-full max-w-lg p-6 bg-white border border-gray-200 shadow-md rounded-lg m-auto flex flex-col items-center"
      onSubmit={formSubmitHandler}
    >
      <h1 className="font-bold text-2xl m-auto my-3">Add Your Expenses</h1>
      <div className="w-full mb-4">
        <label
          htmlFor="amount"
          className="block text-gray-700 font-medium mb-1"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={expenseForm.amount}
          onChange={changeHandler}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-1"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          name="description"
          value={expenseForm.description}
          onChange={changeHandler}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-medium mb-1"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={expenseForm.category}
          onChange={changeHandler}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a Category</option>
          <option value="Gym">Gym</option>
          <option value="Recharge">Recharge</option>
          <option value="Food">Food</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Clothes">Clothes</option>
          <option value="Education">Education</option>
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
