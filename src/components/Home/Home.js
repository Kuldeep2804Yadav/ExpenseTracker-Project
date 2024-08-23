import React from "react";
import Header from "../Header/Header";
import ProfileForm from "../Header/ProfileForm";
import { useSelector } from "react-redux";
import EmailVerify from "./EmailVerify";
import Expense from "./Expense";

const Home = () => {
  const profileFormIsOpen = useSelector((state) => state.ui.profileFormIsOpen);
  const isVerify = useSelector((state) => state.ui.isVerify);
  return (
    <div>
      <Header />
      {profileFormIsOpen && <ProfileForm />}
      {isVerify && <EmailVerify />}
      <Expense/>
      
    </div>
  );
};

export default Home;
