import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { useLocation, useNavigate } from "react-router-dom";
import Globalstyles from "./styles/Globalstyles";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const { pathname } = useLocation();
  const history = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      history("/login");
    }
  });
  return (
    <AuthProvider>
      <div className="App">
        <Globalstyles />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
