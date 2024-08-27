import React from "react";
import Header from "../Header/Header";
import ProfileForm from "../Header/ProfileForm";
import { useSelector } from "react-redux";
import EmailVerify from "./EmailVerify";
import Expense from "./Expense";
import Heading from "./Heading";

const Home = () => {
  const profileFormIsOpen = useSelector((state) => state.ui.profileFormIsOpen);
  const isVerify = useSelector((state) => state.ui.isVerify);

  return (
    <div className="  dark:bg-gray-800 ">
      <Header />
      <Heading/>

      {profileFormIsOpen && <ProfileForm />}
      {isVerify && <EmailVerify />}
      <Expense />
    </div>
  );
};

export default Home;
