import React from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler, setLocalId, setLogin } from "../../store/AuthSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.Auth.login);
  const loginStateHandler = () => {
    dispatch(setLogin());
  };

  const url = login
    ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k"
    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k";

  const AuthenticationHandler = async (AuthFormData) => {
    try {
      const response = await axios.post(url, AuthFormData);

      if (response.status !== 200) {
        throw new Error("Something Went Wrong!!");
      } else {
        if (login) {
          dispatch(loginHandler(response.data.idToken));
          dispatch(setLocalId(response.data.localId));
          toast.success("Login Successfully");
        } else {
          toast.success("You are Registered Successfully");
          dispatch(setLogin());
        }
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.error.message ||
          "Something went wrong. Please try again.";

        toast.error(`Error: ${errorMessage}`);
      } else if (error.request) {
        toast.error(
          "Network error: No response received. Please check your internet connection."
        );
      } else {
        toast.error(`Error: ${error.message}`);
      }

      console.error("Authentication failed:", error);
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
