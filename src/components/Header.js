import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderStyle>
      <div>
        <img src="/quiz.png" alt="question-mark" />
      </div>
      <h1>Welcome To The Ultimate Quiz-Down App</h1>
      <p>
        Select your realm of curiosity, dive into the questions, and let the
        excitement of discovery fuel your quiz-winning journey!
      </p>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 40rem;
  margin: 0 auto;
  p {
    padding: 0.5rem 0 0 0;
    line-height: 1.8;
    font-size: 18px;
  }
  img {
    width: 10rem;
  }
`;
export default Header;
