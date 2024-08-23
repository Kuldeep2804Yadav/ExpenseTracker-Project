import React from "react";
import Button from "../UI/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setVerify } from "../../store/UiSlice";

const EmailVerify = () => {
    const idToken = useSelector((state)=> state.Auth.idToken);
    const dispatch= useDispatch();
  const EmailVerifyHandler = async() => {
    try{
        const response = axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k",{
            requestType:"VERIFY_EMAIL",
            idToken:idToken
        });
        console.log(response.data)
        alert("Check Your Email for Verification")
        dispatch(setVerify());
        
    }catch(error){
        console.log(error);
    }


  };
  return (
    <div className=" w-2/6 h-max bg-white shadow-lg flex flex-col items-center justify-center m-auto mt-12 py-2 px-10  ">
    <p className="font-bold text-2xl">Thank for Signing up</p>
      <h1 className="font-bold text-2xl my-5">Verify Your Email Address</h1>
      
      <p>For Further Use You Have To verify Your Email Address</p>
      <Button title="Verify Email" onClick={EmailVerifyHandler} className=" px-10 my-2 bg-blue-500 hover:bg-blue-800" />
    </div>
  );
};

export default EmailVerify;
