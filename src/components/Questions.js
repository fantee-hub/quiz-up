import React from "react";
import styled from "styled-components";
import Options from "./Options";
import NextBtn from "./NextBtn";
import TimeRemaining from "./TimeRemaining";

const Questions = ({
  dispatch,
  question,
  answer,
  index,
  numberOfQuestions,
  timeRemaining,
}) => {
  const parser = new DOMParser();

  return (
    <QuizBox>
      <div className="show-quiz">
        <header>
          <div className="title">Quiz Down</div>
          <div className="timer">
            <div className="time-text">Time Left</div>
            <div
              className={`time-sec ${timeRemaining <= 59 ? "time-off" : ""}`}
            >
              <TimeRemaining
                dispatch={dispatch}
                timeRemaining={timeRemaining}
              />
            </div>
          </div>
        </header>
        <section>
          <div className="que-text">
            <h4>
              {
                parser.parseFromString(question.question, "text/html").body
                  .textContent
              }
            </h4>
          </div>
          <Options question={question} answer={answer} dispatch={dispatch} />
        </section>
        <footer>
          <div className="total-que">
            <span>
              <p>
                <strong>{index + 1}</strong> of{" "}
                <strong>{numberOfQuestions}</strong> Questions
              </p>
            </span>
          </div>
          <NextBtn
            dispatch={dispatch}
            answer={answer}
            index={index}
            numberOfQuestions={numberOfQuestions}
          />
        </footer>
      </div>
    </QuizBox>
  );
};

const QuizBox = styled.div`
  width: 100%;
  height: 70vh;
  display: grid;
  place-items: center;
  background: #e0e0e0;
  .show-quiz {
    width: 30rem;

    box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff;
    border-radius: 0.3rem;
    @media screen and (max-width: 700px) {
      width: 100%;
    }

    header {
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.3rem 0.3rem 0 0;
      box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.1);
      .title {
        font-size: 1.25rem;
        font-weight: 600;
      }
      .timer {
        display: flex;
        column-gap: 1rem;
        background: #19bc8b;
        padding: 0.6rem;
        color: #f0f0f0;
        border-radius: 0.3rem;
        .time-sec {
          font-weight: 600;
        }
        .time-sec.time-off {
          color: red;
        }
        .time-text {
          user-select: none;
          font-weight: 400;
        }
      }
    }
    section {
      padding: 1.6rem 1.9rem 1.6rem 1.9rem;
      .que-text {
        font-size: 1.4rem;
        font-weight: 600;
      }
    }
    footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4.4rem;
      padding: 0 2rem;
      .total-que span {
        display: flex;
        user-select: none;
        p {
          padding: 0 0.3rem;
          font-weight: 500;
          &:first-child {
            padding-left: 0;
          }
        }
      }
    }
  }
`;

export default Questions;
