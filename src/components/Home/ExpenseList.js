import React from "react";
import Button from "../UI/Button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseData, editExpenseList } from "../../store/expenseSlice";

const ExpenseList = ({ expense }) => {
  const { amount, description, category, expenseId } = expense;
  const localId = useSelector((state) => state.Auth.localId);
  
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteExpenseData(expenseId, localId));
  };

  const editHandler = () => {
    dispatch(editExpenseList(expenseId));
  };

  return (
    <div className="max-w-lg w-full m-auto mt-6 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">₹{amount}</h1>
        <p className=" text-lg text-gray-600 dark:text-gray-300">{description}</p>
        <p className="text-lg text-gray-600 dark:text-gray-300">{category}</p>
      </div>
      <div className="flex space-x-4">
        <Button
          title={<FaEdit />}
          className="text-blue-500 dark:text-blue-300 text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          onClick={editHandler}
        />
        <Button
          title={<MdDelete />}
          className="text-red-500 dark:text-red-300 text-2xl hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
          onClick={deleteHandler}
        />
      </div>
    </div>
  );
};

export default ExpenseList;
