import React from "react";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { setProfileFormOpen, setVerify } from "../../store/UiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/AuthSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = useSelector((state) => state.ui.title);

  const profileFormHandler = () => {
    dispatch(setProfileFormOpen());
  };
  const verifyEmailHandler = () => {
    dispatch(setVerify());
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className=" w-full h-max p-3 bg-white border border-black flex items-center justify-between px-2">
      <div className="font-bold text-2xl ">Welcome to Expense Tracker</div>
      <div className="h-max w-max">
        <span> {title}</span>
        <Button
          title="Complete now"
          className="px-1 text-blue-600"
          onClick={profileFormHandler}
        />
        <Button
          title="Verify Email"
          onClick={verifyEmailHandler}
          className=" bg-blue-500 px-3"
        />
        <Button
          className="  bg-blue-500 px-3 ml-2"
          title="Logout"
          onClick={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Header;
