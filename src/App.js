import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import PageNotFound from "./components/404page";
import QuizContainer from "./components/QuizContainer";
import Quiz from "./components/Quiz";
import PrivateRoute from "./components/PrivateRoute";

import Globalstyles from "./styles/Globalstyles";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <div className="App">
        <Globalstyles />
        <Routes location={location} key={location.pathname}>
          <Route
            path={"/"}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/main-quiz" element={<QuizContainer />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
