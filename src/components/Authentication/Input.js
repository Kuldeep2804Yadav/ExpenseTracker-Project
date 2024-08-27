import React, { useState } from "react";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setAuthFormData } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const Input = ({ AuthenticationHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const login = useSelector((state) => state.Auth.login);
  const AuthFormData = useSelector((state) => state.Auth.AuthFormData);

  const changeHandle = (event) => {
    const { value, name } = event.target;
    dispatch(setAuthFormData({ ...AuthFormData, [name]: value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!login) {
      if (AuthFormData.password !== AuthFormData.confirmPassword) {
        alert("Password and Confirm Password should be the same");
        return AuthFormData
      } else {
        console.log(AuthFormData);
      }
    }
    AuthenticationHandler(AuthFormData);
    dispatch(
      setAuthFormData({
        email: "",
        password: "",
        confirmPassword: "",
      })
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const forgetPasswordHandler = () => {
    navigate("/forgetpassword");
    
  };

  return (
    <form
      className="w-full max-w-md border border-gray-300 rounded-lg shadow-md bg-white p-6 flex flex-col items-center justify-center mx-auto"
      onSubmit={formSubmitHandler}
    >
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        {login ? "Login" : "Signup"}
      </h1>
      <div className="w-full mb-4 flex flex-col">
        <label htmlFor="email" className="mb-2 text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={AuthFormData.email}
          name="email"
          onChange={changeHandle}
          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full mb-4 flex flex-col">
        <label htmlFor="password" className="mb-2 text-gray-600">
          Password
        </label>
        <div className="relative flex items-center">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            name="password"
            value={AuthFormData.password}
            onChange={changeHandle}
            className="relative w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-0 mr-2 z-10 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      {!login && (
        <div className="w-full mb-4 flex flex-col">
          <label htmlFor="confirmPass" className="mb-2 text-gray-600">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <input
              id="confirmPass"
              type={showConfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={AuthFormData.confirmPassword}
              onChange={changeHandle}
              className="relative w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-0 mr-2 z-10 focus:outline-none"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      )}
      <Button
        type="submit"
        className="w-full py-2 mt-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        title={login ? "Login" : "Signup"}
      />
      {login && (
        <Button
          className=" mt-3 text-red-500 hover:text-red-600"
          title="Forgotten Your Password?"
          onClick={forgetPasswordHandler}
        />
      )}
    </form>
  );
};

export default Input;
