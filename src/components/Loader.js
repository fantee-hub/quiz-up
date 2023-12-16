import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <div className="loader"></div>
      <p>Loading questions...</p>
    </LoaderContainer>
  );
};

const loader = keyframes`
    20% {
      background-position: 0% 0%, 50% 50%, 100% 50%;
    }
    40% {
      background-position: 0% 100%, 50% 0%, 100% 50%;
    }
    60% {
      background-position: 0% 50%, 50% 100%, 100% 0%;
    }
    80% {
      background-position: 0% 50%, 50% 50%, 100% 100%;
    }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  gap: 1.6rem;

  font-size: 1.4rem;
  .loader {
    width: 50px;
    height: 24px;
    background: radial-gradient(circle closest-side, currentColor 90%, #0000) 0%
        50%,
      radial-gradient(circle closest-side, currentColor 90%, #0000) 50% 50%,
      radial-gradient(circle closest-side, currentColor 90%, #0000) 100% 50%;
    background-size: calc(100% / 3) 12px;
    background-repeat: no-repeat;
    animation: ${loader} 1s infinite linear;
  }
`;
export default Loader;
