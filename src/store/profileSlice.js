import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileFormData: {
      displayName: "",
      photoUrl: "",
    },
  },
  reducers: {
    setProfileFormData(state,action){
        state.profileFormData=action.payload;

    }
  },
});

export const {setProfileFormData}= profileSlice.actions;

export default profileSlice.reducer
