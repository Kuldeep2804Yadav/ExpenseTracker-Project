import React, { useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import {useDispatch, useSelector } from "react-redux";
import { setTotalAmount } from "../../store/expenseSlice";


const Expense = () => {
  const expenseList = useSelector((state) => state.expense.expenseList);
  const dispatch= useDispatch();
 
  useEffect(()=> {
    dispatch(setTotalAmount(expenseList));

  },[expenseList,dispatch])

  
 
 
  

  return (
    <div className=" w-full h-screen mt-8  ">
      <ExpenseForm />
      {expenseList.map((expense) => {
        return <ExpenseList key={expense.expenseId} expense={expense} />;
      })}
    </div>
  );
};

export default Expense;
