import React from "react";
import styled from "styled-components";

const NextBtn = ({ index, answer, dispatch, numberOfQuestions }) => {
  if (answer === null) return null;
  if (index < numberOfQuestions - 1)
    return (
      <NextButtonContainer>
        <button
          className="next-btn"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next Que
        </button>
      </NextButtonContainer>
    );

  if (index === numberOfQuestions - 1)
    return (
      <NextButtonContainer>
        <button
          className="next-btn"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </NextButtonContainer>
    );
};

const NextButtonContainer = styled.div`
  .next-btn {
    padding: 0.7rem 0.8rem;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
    background-color: #19bc8b;
    color: white;
    outline: none;
    transition: all 0.3s ease;
    font-family: "Nunito Sans", sans-serif;
    &:hover {
      background-color: #2db38a;
    }
  }
`;
export default NextBtn;
