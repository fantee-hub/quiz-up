import React from "react";
import styled from "styled-components";

const Finish = ({ dispatch, points, numberOfQuestions }) => {
  const totalPoints = numberOfQuestions * 10;
  const percentage = Math.floor((points / totalPoints) * 100);

  let emoji;

  if (percentage === 100) emoji = "🏆";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <ResultBox>
      <div className="result-box">
        <div className="icon">{emoji}</div>

        <div className="complete-text">You've completed the Quiz!</div>
        <div className="score-text">
          You got <strong>{percentage}%</strong> of the questions
        </div>
        <div className="buttons">
          <button onClick={() => dispatch({ type: "restart" })}>Restart</button>
        </div>
      </div>
    </ResultBox>
  );
};

const ResultBox = styled.div`
  .result-box {
    position: absolute;
    width: 28rem;
    height: 18rem;
    padding: 1.6rem 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    text-align: center;
    font-size: 20px;

    @media screen and (max-width: 700px) {
      width: 25rem;
    }
    @media screen and (max-width: 450px) {
      max-width: 23rem;
      padding: 1.2rem 1rem;
      font-size: 0.9rem;
    }
    @media screen and (max-width: 380px) {
      max-width: 20rem;
    }
    .buttons {
      margin: 1.25rem 0;
      button {
        padding: 0.7rem 0.8rem;
        border-radius: 0.3rem;
        border: none;
        font-size: 20px;
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
    }
  }
`;
export default Finish;
