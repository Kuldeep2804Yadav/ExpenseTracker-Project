import axios from "axios";
import React, { useRef } from "react";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef();

  const forgetPasswordHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );

      if (response.status === 200) {
        toast.success("Check your email for password reset instructions.");
        navigate("/auth");
      } else {
        toast.error("Failed to send password reset email. Please try again.");
      }
      
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error("Failed to send password reset email. Please try again.");
    } finally {
      emailRef.current.value = "";
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-xl">Reset Password</h1>
      <form
        onSubmit={forgetPasswordHandler}
        className="flex flex-col border border-black w-3/12 px-6 py-3 my-5 rounded-xl shadow-lg"
      >
        <label htmlFor="email" className="mt-3">
          Email
        </label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          className="border border-black ring-1 rounded-lg p-2"
          required
        />
        <Button
          className="my-4 bg-blue-500"
          type="submit"
          title="Reset Password"
        />
      </form>
    </div>
  );
};

export default ForgetPassword;
