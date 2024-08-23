import React from "react";
import Button from "../UI/Button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseData, deleteExpenseList, editExpenseList } from "../../store/expenseSlice";

const ExpenseList = ({ expense }) => {
  const { amount, description, category, expenseId } = expense;
  const localId= useSelector((state)=> state.Auth.localId);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteExpenseData(expenseId,localId,));
  };
  const editHandler=()=>{
    dispatch(editExpenseList(expenseId));
  }


  return (
    <div className="max-w-lg w-full m-auto mt-5 h-max bg-white border border-gray-300 shadow-md rounded-lg flex items-center justify-between py-4 px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold ">₹{amount}</h1>
        <p className="text-md text-gray-800 mt-2">{description}</p>
        <p className="text-md text-gray-800 mt-2">{category}</p>
      </div>
      <div className="flex space-x-10">
        <Button
          title={<FaEdit />}
          className="text-blue-500 text-2xl hover:text-blue-700"
          onClick={editHandler}
        />
        <Button
          title={<MdDelete />}
          className="text-red-500 text-2xl hover:text-red-700"
          onClick={deleteHandler}
        />
      </div>
    </div>
  );
};

export default ExpenseList;
