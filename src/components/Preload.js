import React, { useEffect } from "react";
import styled from "styled-components";

function Preload({ dispatch, countDown }) {
  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: "countDown" }), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <>
      <PreloadContainer>
        <div className="countdown">
          <h1>{countDown}</h1>
        </div>
      </PreloadContainer>
    </>
  );
}

const PreloadContainer = styled.div`
  .countdown {
    background: #e0e0e0;
    color: #808080;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 30%;
    bottom: 0;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%, -30%);
    z-index: 9999;
    transition: all 0.1s ease-out;
    h1 {
      font-size: 4rem;
    }
  }
`;
export default Preload;
