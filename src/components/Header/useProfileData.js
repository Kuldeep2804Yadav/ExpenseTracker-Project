import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setisProfile, setProfileFormData } from "../../store/profileSlice";
import {  setProfileFormOpen, setTitle } from "../../store/UiSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const useProfileData = () => {
  const idToken = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const updateProfileData = async (profileData) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k",
        {
          idToken: idToken,
          displayName: profileData.displayName,
          photoUrl: profileData.photoUrl,
          returnSecureToken: false,
        }
      );
      dispatch(setisProfile(response.data.displayName));
      dispatch(setProfileFormOpen());
      console.log(response.data)

      toast.success("Your Profile has Successfully updated");
    } catch (error) {
     if(error.response){
      const errorMessage= error.response.data.message || "Unable to Update Profile Data !! Please Try Again."
      toast.error(errorMessage)
      
     }
     else if(error.request){
      toast.error(
        "Network error: No response received. Please check your internet connection."
      );
     }
     else{
      toast.error("Error:" ,error.message);
      
     }
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k",
        {
          idToken: idToken,
        }
      );

      const userData = response?.data?.users[0];
      console.log(userData)

      if (response.status === 200 && userData) {
        dispatch(setProfileFormData(userData));
        dispatch(setisProfile(userData.displayName));

        const isProfileComplete = userData.displayName && userData.photoUrl;
        const profileTitle = isProfileComplete
          ? "Your Profile Has Completed"
          : "Your Profile is Incomplete";

        dispatch(setTitle(profileTitle));
      }
    } catch (error) {
      if(error.response){
       const errorMessage= error.response.data.message || "Unable to Fetch Profile Data !! Please Try Again."
       toast.error(errorMessage)
       
      }
      else if(error.request){
       toast.error(
         "Network error: No response received. Please check your internet connection."
       );
      }
      else{
       toast.error("Error:" ,error.message);
       
      }
     }
  };

  return { updateProfileData, getUserData };
};
