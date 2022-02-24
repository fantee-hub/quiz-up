import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const history = useNavigate();

  const logOutHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to sign out");
    }
  };
  return (
    <HomeContainer>
      {error && <div>{error}</div>}
      Home
      <button onClick={logOutHandler}>Log out</button>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;
