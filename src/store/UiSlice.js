import { createSlice } from "@reduxjs/toolkit";
const darkTheme = JSON.parse(localStorage.getItem("darktheme")) || false;

const uiSlice = createSlice({
  name: "ui",
  initialState: { 
    profileFormIsOpen: false, 
    isVerify: false, 
    title: "Your Profile is Incomplete", 
    darktheme: darkTheme ,
    error : null
  },
  reducers: {
    setProfileFormOpen(state) {
      state.profileFormIsOpen = !state.profileFormIsOpen;
    },
    setVerify(state) {
      state.isVerify = !state.isVerify;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDarkTheme(state, action) {
      state.darktheme = action.payload;
      localStorage.setItem("darktheme", state.darktheme);
      console.log("dark theme is:", state.darktheme);
    },
   
  },
});

export const { setProfileFormOpen, setVerify, setTitle, setDarkTheme } = uiSlice.actions;
export default uiSlice.reducer;
