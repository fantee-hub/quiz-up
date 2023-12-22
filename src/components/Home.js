import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { fetchCategory, fetchQuiz } from "../utils";
import TotalQuestion from "./TotalQuestion";
import Difficulty from "./Difficulty";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Preload from "./Preload";
import Questions from "./Questions";
import Finish from "./Finish";

export default function Home() {
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const { logout, currentUser } = useAuth();
  const history = useNavigate();
  const TIME_PER_QUESTION = 30;

  const initialState = {
    questions: [],
    //loading, ready, error, finished, active, countdown
    status: "loading",
    answer: null,
    index: 0,
    categoryId: 9,
    amount: 5,
    difficulty: "easy",
    countDown: 5,
    points: 0,
    timeRemaining: null,
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
      case "countDown":
        return {
          ...state,
          status: state.countDown === 1 ? "active" : "countdown",
          countDown: state.countDown - 1,
          timeRemaining:
            state.countDown === 1
              ? state.questions.length * TIME_PER_QUESTION
              : null,
        };
      case "start":
        return {
          ...state,
          status: "active",
        };
      case "newAnswer":
        const currentQuestion = state.questions[state.index];
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === currentQuestion.correct_answer
              ? state.points + 10
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "tick":
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
          status: state.timeRemaining === 0 ? "finished" : state.status,
        };
      case "finish":
        return {
          ...state,
          status: "finished",
        };
      case "restart":
        return {
          ...initialState,
          questions: state.questions,
          status: "ready",
        };

      default:
        throw new Error("Unknown Action");
    }
  }

  const [
    {
      questions,
      status,
      index,
      amount,
      difficulty,
      categoryId,
      countDown,
      answer,
      points,
      timeRemaining,
    },
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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getQuiz = async () => {
    try {
      const quizData = await fetchQuiz(amount, categoryId, difficulty);

      if (quizData) {
        dispatch({ type: "receivedData", payload: quizData.data.results });
      }
    } catch (e) {
      if (e.response && e.response.status === 429) {
        // If it's a 429 error (rate limit), wait for 5 seconds and try again
        await delay(5000);
        return;
      } else {
        dispatch({ type: "dataFailed" });
      }
      console.log(e);
    }
  };

  useEffect(() => {
    getQuiz();
  }, [amount, categoryId, difficulty]);

  const numberOfQuestions = questions.length;

  return (
    <>
      <HomeContainer>
        <div>
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

        {status === "loading" && <Loader />}
        {status === "error" && <Error dispatch={dispatch} />}
        {status === "ready" && (
          <HomeContent>
            <Header />
            <Dropdowns>
              <Dropdown category={category} dispatch={dispatch} />
              <TotalQuestion amount={amount} dispatch={dispatch} />
              <Difficulty dispatch={dispatch} difficulty={difficulty} />
            </Dropdowns>
            <Start dispatch={dispatch} />
          </HomeContent>
        )}

        {status === "countdown" && (
          <Preload dispatch={dispatch} countDown={countDown} />
        )}

        {status === "active" && (
          <>
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              numberOfQuestions={numberOfQuestions}
              index={index}
              timeRemaining={timeRemaining}
            />
          </>
        )}

        {status === "finished" && (
          <Finish
            dispatch={dispatch}
            points={points}
            numberOfQuestions={numberOfQuestions}
          />
        )}
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  padding: 2rem 5rem;

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
  @media screen and (max-width: 756px) {
    padding: 1rem;
  }
`;

const HomeContent = styled.div`
  padding: 2rem 0 0 0;
`;

const Dropdowns = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }
`;
