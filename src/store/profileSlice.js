import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileFormData: {
      displayName: "",
      photoUrl: "",
    },
    isProfile:""
    
  },
  reducers: {
    setProfileFormData(state,action){
        state.profileFormData=action.payload;
    },
    setisProfile(state,action){
      state.isProfile= !!action.payload;

    }
   
  },
});

export const {setProfileFormData,setisProfile}= profileSlice.actions;

export default profileSlice.reducer
