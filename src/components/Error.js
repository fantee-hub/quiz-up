import React from "react";
import styled from "styled-components";

const Error = ({ dispatch }) => {
  return (
    <ErrorContainer>
      <p className="error">
        <span>💥</span> There was an error fecthing questions.
      </p>
      <div className="button-container">
        <button onClick={() => dispatch({ type: "receivedData" })}>
          Go back to homepage
        </button>
      </div>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  padding: 3rem 0 0 0;
  .error {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;

    padding: 2rem;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
    border-radius: 8px;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }
  button {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    border-radius: 100px;
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 18px;
    font-family: "Nunito Sans", sans-serif;
  }
`;
export default Error;
