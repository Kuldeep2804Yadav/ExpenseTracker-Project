import React, { useEffect } from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler,setLocalId,setLogin } from "../../store/AuthSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.Auth.login);
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

  const loginStateHandler = () => {
    dispatch(setLogin());
  };

  const url = login
    ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k"
    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k";

  const AuthenticationHandler = async (AuthFormData) => {
    try {
      const response = await axios.post(url, AuthFormData);
      console.log(response.data);

      if (login) {
        dispatch(loginHandler(response.data.idToken));
        dispatch(setLocalId(response.data.localId));
       
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Authentication failed. Please try again.");
    }
  };



  return (
    <div className="bg-white w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-8">
        <Input AuthenticationHandler={AuthenticationHandler} />
      </div>
      <div className="w-full max-w-md px-8 mt-4">
        <button
          className="border border-blue-500 rounded-lg shadow-lg w-full max-w-md bg-white my-4 text-center text-blue-500 px-3 py-2 transition-colors duration-300 hover:bg-blue-100"
          onClick={loginStateHandler}
        >
          {login
            ? "Don't Have an Account? Signup"
            : "Already Have an Account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
