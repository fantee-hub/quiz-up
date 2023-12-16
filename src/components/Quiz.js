import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../contexts/AuthContext";
import { fetchQuizzes } from "../app/reducers/quizReducer";
import { useNavigate } from "react-router-dom";
import quizApi from "../api/quizApi";
import styled from "styled-components";

function Quiz() {
  const { categoryNumber, category } = useAuth();

  const { isLoaded } = useSelector;
  const dispatch = useDispatch();
  const history = useNavigate();

  // useEffect(() => {
  //   const fetchQuiz = async () => {
  //     const response = await quizApi
  //       .get(
  //         `?amount=10&category=${categoryNumber}&difficulty=hard&type=multiple`
  //       )
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     dispatch(fetchQuizzes(response.data));
  //   };
  //   fetchQuiz();
  // });

  const fetchQuizHandler = () => {
    if (!isLoaded) {
      history("/main-quiz");
    }
  };

  return (
    <CategoryPage>
      <div className="category-container">
        <h1>{category && category}</h1>
        <button onClick={fetchQuizHandler}>
          Click here to progress to quiz
        </button>
      </div>
    </CategoryPage>
  );
}

const CategoryPage = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
  background: #e0e0e0;
  color: #808080;
  .category-container {
    h1 {
      margin-bottom: 2rem;
      text-align: center;
    }
    button {
      padding: 1.5rem 3rem;
      background: transparent;
      color: white;
      border-radius: 0.3rem;
      box-shadow: inset 0 0 0 0 #19bc8b;
      transition: ease-out 0.3s;
      outline: none;
      border: 1px solid #19bc8b;
      color: #19bc8b;
      font-family: "Nunito Sans", sans-serif;
      cursor: pointer;
      &:hover {
        box-shadow: inset 280px 0 0 0 #19bc8b;
        color: white;
      }
    }
  }
`;
export default Quiz;
