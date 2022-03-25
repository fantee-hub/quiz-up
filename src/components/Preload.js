import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function Preload() {
  const [removePreload, setRemovePreload] = useState(null);
  const timeRef = useRef(null);
  let countDownValue = 5;
  let time;
  const countdown = (timerValue) => {
    time = setInterval(() => {
      timeRef.current.innerHTML = `<h1> ${timerValue}<h1>`;
      timerValue--;
      if (timerValue < 0) {
        clearInterval(time);
        setRemovePreload(time);
      }
    }, 1000);
  };
  useEffect(() => {
    countdown(countDownValue);
  });

  return (
    <>
      <PreloadContainer>
        <div
          className={`countdown ${removePreload ? "remove" : ""}`}
          ref={timeRef}
        ></div>
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
    transition: all 0.3s ease-out;
  }
  .countdown.remove {
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none;
  }
`;
export default Preload;
