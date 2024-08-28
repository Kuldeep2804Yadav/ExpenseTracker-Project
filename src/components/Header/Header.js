import React, { useEffect } from "react";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileFormOpen,
  setVerify,
  setDarkTheme,
} from "../../store/UiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/AuthSlice";
import { FaSun, FaMoon } from "react-icons/fa";
import { useProfileData } from "./useProfileData";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getUserData } = useProfileData();
  const title = useSelector((state) => state.ui.title);
  const idToken = useSelector((state) => state.Auth.idToken);
  const darktheme = useSelector((state) => state.ui.darktheme);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const profileFormData = useSelector((state) => state.profile.profileFormData);
  const isProfile = useSelector((state) => state.profile.isProfile);
  const localId = useSelector((state) => state.Auth.localId);

  useEffect(() => {
    if (darktheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darktheme]);

  useEffect(() => {
    if (idToken) {
      getUserData(idToken);
    }
  }, [idToken]);

  const profileFormHandler = () => {
    dispatch(setProfileFormOpen());
  };

  const verifyEmailHandler = () => {
    dispatch(setVerify());
  };

  const logoutHandler = () => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem(localId);
    dispatch(logout());
    navigate("/auth");
  };

  const darkModeHandler = () => {
    dispatch(setDarkTheme(!darktheme));
  };

  return (
    <div className="w-full h-max p-3 bg-white border dark:bg-gray-700 dark:text-white border-black flex items-center justify-between px-2">
      <div className="font-bold text-2xl ml-4">Welcome to Expense Tracker</div>
      <div className="h-max w-max flex justify-between items-center">
        {isProfile ? (
          <button
            className="flex items-center justify-center mr-3"
            onClick={profileFormHandler}
          >
            <img
              src={profileFormData.photoUrl}
              alt="userProfile"
              className="w-8 h-8 rounded-full mr-2 border border-black border-4 dark:border-none"
            />
            <h1 className="font-bold text-lg">{profileFormData.displayName}</h1>
          </button>
        ) : (
          <div className="mr-3">
            <span className="text-lg">{title}</span>
            <Button
              title="Complete now"
              className="px-1 text-blue-600 text-lg dark:text-blue-500"
              onClick={profileFormHandler}
            />
          </div>
        )}

        {totalAmount >= 10000 && (
          <Button
            className="px-3 ml-1 mr-2 text-bold text-xl"
            title={darktheme ? <FaSun /> : <FaMoon />}
            onClick={darkModeHandler}
          />
        )}
        {!profileFormData.emailVerified && (
          <Button
            title="Verify Email"
            onClick={verifyEmailHandler}
            className="bg-blue-500 px-3 mr-4"
          />
        )}

        <Button
          className="bg-blue-500 px-3 ml-2 mr-4"
          title="Logout"
          onClick={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Header;
