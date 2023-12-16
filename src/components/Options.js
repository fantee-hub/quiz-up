import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Options = ({ question, answer, dispatch }) => {
  const hasAnswer = answer !== null;
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const parser = new DOMParser();

  useEffect(() => {
    // Shuffle the answers when the question changes
    const shuffled = [...question.incorrect_answers, question.correct_answer];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledAnswers(shuffled);
  }, [question]);

  return (
    <OptionList>
      {shuffledAnswers.map((option, index) => (
        <button
          key={index}
          className={`option ${option === answer ? "answer" : ""} ${
            hasAnswer
              ? option === question.correct_answer
                ? "correct"
                : "wrong"
              : ""
          } `}
          disabled={hasAnswer}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: option });
          }}
        >
          {parser.parseFromString(option, "text/html").body.textContent}
        </button>
      ))}
    </OptionList>
  );
};

const OptionList = styled.div`
  padding: 1.25rem 0;
  display: block;

  .option {
    background: #f0f0f0;
    border: 1px solid #e6e6e6;
    border-radius: 0.3rem;
    padding: 0.8rem 0.9rem;
    margin-bottom: 1rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.3s ease;
    &:last-child {
      margin-bottom: 0;
    }
    &:not([disabled]):hover {
      background: #e0e0;
      color: black;
      transform: translateX(1.2rem);
      border: 1px solid #ccc;
    }
  }
  .option[disable]:hover {
    cursor: not-allowed;
  }
  .correct {
    background-color: #66bb6a;
    color: #ffffff;
  }
  .wrong {
    background-color: #ef5350;
    color: #ffffff;
  }
  .answer {
    transform: translateX(1.2rem);
  }
  /* .option.wrong {
    background-color: red;
  } */
`;

export default Options;
