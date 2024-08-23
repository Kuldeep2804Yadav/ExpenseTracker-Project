import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfileFormData } from "../../store/profileSlice";
import { setTitle } from "../../store/UiSlice";

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
      console.log(response.data)

      alert("Your Profile has Successfully updated");
    } catch (error) {
      console.log(error);
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
      
      if (response.status === 200 && userData) {
        dispatch(setProfileFormData(userData));
        
        const isProfileComplete = userData.displayName && userData.photoUrl;
        const profileTitle = isProfileComplete
          ? "Your Profile Has Completed"
          : "Your Profile is Incomplete";

        dispatch(setTitle(profileTitle));
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { updateProfileData, getUserData };
};
