import React from "react";
import styled from "styled-components";

const Start = ({ dispatch }) => {
  return (
    <StartButton>
      <button onClick={() => dispatch({ type: "countDown" })}>
        Let's Start
      </button>
    </StartButton>
  );
};

const StartButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0 0 0;
  button {
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
export default Start;
