import { useDispatch, useSelector } from "react-redux";
import Auth from "./components/Authentication/Auth";
import Home from "./components/Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import { fetchExpenseList } from "./store/expenseSlice";
import { useEffect } from "react";


function App() {
 
  const idToken = useSelector((state) => state.Auth.idToken);
  const isLoggedIn = !!idToken;
  const localId= useSelector((state)=>state.Auth.localId);
  const dispatch=useDispatch();

  
  useEffect(() => {
    if (localId) {
      dispatch(fetchExpenseList(localId));
    }
  }, [dispatch,localId]);

  return (
    <div className="App">
      <Routes>
        {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
        {!isLoggedIn && (
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        )}

        {isLoggedIn && <Route path="/" element={<Home />} />}

        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
