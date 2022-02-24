import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import PageNotFound from "./components/404page";
import PrivateRoute from "./components/PrivateRoute";

import Globalstyles from "./styles/Globalstyles";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Globalstyles />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
