import { createSlice } from "@reduxjs/toolkit";



const uiSlice = createSlice({
  name: "ui",
  initialState: { profileFormIsOpen: false, isVerify: false ,title:"Your Profile is Incomplete" },
  reducers: {
    setProfileFormOpen(state) {
      state.profileFormIsOpen = !state.profileFormIsOpen;
    },
    setVerify(state) {
      state.isVerify = !state.isVerify;
    },
    setTitle(state,action){
        state.title = action.payload;
    }
  },
});
export const { setProfileFormOpen,setVerify,setTitle } = uiSlice.actions;
export default uiSlice.reducer;
