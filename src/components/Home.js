import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { fetchCategory, fetchQuiz } from "../utils";
import TotalQuestion from "./TotalQuestion";
import Difficulty from "./Difficulty";
import Header from "./Header";

export default function Home() {
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const { logout, currentUser } = useAuth();
  const history = useNavigate();

  const initialState = {
    questions: [],
    //loading, ready, error, finished, active
    status: "loading",
    answer: null,
    index: 0,
    categoryId: 9,
    amount: 5,
    difficulty: "easy",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "receivedData":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "newCategory":
        return {
          ...state,
          categoryId: action.payload,
        };
      case "newDifficulty":
        return {
          ...state,
          difficulty: action.payload,
        };
      case "newAmount":
        return {
          ...state,
          amount: action.payload,
        };
      default:
        throw new Error("Unknown Action");
    }
  }

  const [
    { questions, status, index, amount, difficulty, categoryId },
    dispatch,
  ] = useReducer(reducer, initialState);

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

  const getCategoryList = async () => {
    try {
      const categoryData = await fetchCategory();
      if (categoryData) {
        setCategory(categoryData.data.trivia_categories);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const quizData = await fetchQuiz(amount, categoryId, difficulty);
        if (quizData) {
          dispatch({ type: "receivedData", payload: quizData.data.results });
        }
      } catch (e) {
        dispatch({ type: "dataFailed" });
        console.log(e);
      }
    };
    getQuiz();
  }, [amount, categoryId, difficulty]);

  return (
    <>
      <HomeContainer>
        <div className="container">
          {error && <div>{error}</div>}
          <div className="home-header">
            <button onClick={logOutHandler} className="logout">
              Log out
            </button>
            <div className="user-email">
              <span>{currentUser.email}</span>
            </div>
          </div>
        </div>
        <Header />
        <HomeContent>
          <Dropdown category={category} dispatch={dispatch} />
          <Difficulty dispatch={dispatch} />
          <TotalQuestion amount={amount} dispatch={dispatch} />
        </HomeContent>
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  padding: 2rem 5rem;
  min-height: 100vh;
  background: #e0e0e0;

  .home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-email {
      color: #646464;
    }
  }
  .logout {
    padding: 0.7rem 1.5rem;
    margin-bottom: 1rem;
    outline: none;
    border: none;
    border-radius: 0.3rem;
    background: #e0e0e0;
    box-shadow: 20px 20px 47px #cecece, -20px -20px 47px #f2f2f2;
    cursor: pointer;
    color: #000;
    text-transform: capitalize;
    font-weight: 600;
    font-family: "Nunito Sans", sans-serif;
    transition: all 0.3s ease-out;
    &:focus {
      box-shadow: inset 20px 20px 47px #cecece, inset -20px -20px 47px #f2f2f2;
    }
  }
`;

const HomeContent = styled.div`
  padding: 5rem 0;
  display: flex;
  justify-content: space-between;
`;
