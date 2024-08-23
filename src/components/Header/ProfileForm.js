import React, { useEffect } from "react";
import Button from "../UI/Button";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setProfileFormOpen } from "../../store/UiSlice";
import { useProfileData } from "./useProfileData";
import { setProfileFormData } from "../../store/profileSlice";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const profileFormIsOpen = useSelector((state) => state.ui.profileFormIsOpen);
  const profileFormData = useSelector((state) => state.profile.profileFormData);
  const idToken = useSelector((state) => state.Auth.idToken);

  const { updateProfileData, getUserData } = useProfileData();

  const changeHandler = (e) => {
    const { value, name } = e.target;
    dispatch(setProfileFormData({ ...profileFormData, [name]: value }));
  };

  const profileFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(profileFormData)
    updateProfileData(profileFormData);
  };

  const profileFormCloseHandler = () => {
    dispatch(setProfileFormOpen());
  };
  useEffect(() => {
    if (idToken) {
      getUserData(idToken);
    }
  }, []);

  return (
    <>
      {profileFormIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            className="relative bg-white shadow-2xl rounded-lg p-6 w-full max-w-lg"
            onSubmit={profileFormSubmitHandler}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h1 className="text-2xl font-semibold">Contact Details</h1>
              <Button
                title="Cancel"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-lg"
                onClick={profileFormCloseHandler} //
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="flex items-center text-xl font-medium mb-2"
              >
                <FaGithub className="mr-2 text-gray-700" /> Full Name:
              </label>
              <input
                id="name"
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={profileFormData.displayName}
                name="displayName"
                onChange={changeHandler}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="image"
                className="flex items-center text-xl font-medium mb-2"
              >
                <TbWorld className="mr-2 text-gray-700" /> Profile Photo URL:
              </label>
              <input
                id="image"
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={profileFormData.photoUrl}
                name="photoUrl"
                onChange={changeHandler}
              />
            </div>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-lg w-full"
              title="Update Profile"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
