import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <ErrorContainer>
      <p className="error">
        <span>💥</span> There was an error fecthing questions.
      </p>
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
`;
export default Error;
