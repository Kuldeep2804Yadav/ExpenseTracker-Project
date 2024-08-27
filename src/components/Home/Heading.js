import React from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

const Heading = () => {
  const expenseList = useSelector((state) => state.expense.expenseList);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const header = [
    { label: "Amount", key: "amount" },
    { label: "Description", key: "description" },
    { label: "Category", key: "category" },
  ];
  const csvData = {
    filename: "ExpenseData.csv",
    headers: header,
    data: expenseList,
  };

 
  return (
    <div className="flex items-center justify-between px-5 py-5">
      <div className="text-black font-bold text-xl border shadow-lg rounded-md px-4 py-1 dark:text-white  ">
        {" "}
        Total Expense: ₹{totalAmount}{" "}
      </div>
      <div className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md dark:text-white " >
        <CSVLink {...csvData}>Download Expense List</CSVLink>
      </div>
      
     
    </div>
  );
};

export default Heading;
