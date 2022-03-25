import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryNumber, setCategoryNumber] = useState("");
  const [category, setCategory] = useState("");

  // function that sets up the user account
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  // get information after user signs in successfully using the observer onAuthStateChanged
  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscibe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    categoryNumber,
    setCategoryNumber,
    category,
    setCategory,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
