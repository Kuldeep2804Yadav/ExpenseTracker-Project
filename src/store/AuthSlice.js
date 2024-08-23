import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("idToken");
const initialLocalId = localStorage.getItem("localId");
const initialStateData = {
  login: false,
  AuthFormData: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  isLoggedIn: !!initialToken,
  idToken: initialToken,
  localId:initialLocalId
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialStateData,
  reducers: {
    setLogin(state) {
      state.login = !state.login;
    },
    loginHandler(state, action) {
      state.idToken = action.payload;
      localStorage.setItem("idToken", action.payload);
    },
    logout(state) {
      state.idToken = null;
      localStorage.removeItem("idToken");
      localStorage.removeItem("localId");
    },
    setAuthFormData(state, action) {
      state.AuthFormData = action.payload;
    },
    setLocalId(state,action){
      state.localId= action.payload;
      localStorage.setItem("localId",action.payload)

    }
  },
});

export const { setLogin, setAuthFormData, loginHandler, logout ,setLocalId} = AuthSlice.actions;

export default AuthSlice.reducer;
