import React, { Suspense } from "react";
import Header from "../Header/Header";
import ProfileForm from "../Header/ProfileForm";
import { useSelector } from "react-redux";
import EmailVerify from "./EmailVerify";
import Heading from "./Heading";
const Expense = React.lazy(() => import("./Expense"));
const Home = () => {
  const profileFormIsOpen = useSelector((state) => state.ui.profileFormIsOpen);
  const isVerify = useSelector((state) => state.ui.isVerify);

  return (
    <div className="  dark:bg-gray-800 ">
      <Header />

      <Heading />
      {profileFormIsOpen && <ProfileForm />}
      {isVerify && <EmailVerify />}
      <Suspense fallback={<div>Loading</div>}>
        <Expense />
      </Suspense>
    </div>
  );
};

export default Home;
