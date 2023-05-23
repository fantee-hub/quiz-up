import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Preload() {
  const [removePreload, setRemovePreload] = useState(null);

  const [timer, setTimer] = useState(5);

  let countDownValue = 5;

  let time;
  const countdown = (timerValue) => {
    time = setInterval(() => {
      setTimer((timerValue -= 1));
      if (timerValue === 0) {
        clearInterval(time);
        setRemovePreload(time);
      }
    }, 1000);
  };
  useEffect(() => {
    countdown(countDownValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PreloadContainer>
        <div className={`countdown ${removePreload ? "remove" : ""}`}>
          <h1>{timer}</h1>
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
    z-index: 9999;
    transition: all 0.1s ease-out;
    h1 {
      font-size: 4rem;
    }
  }
  .countdown.remove {
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none;
  }
`;
export default Preload;
