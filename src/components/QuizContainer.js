import React, { useState, useRef, useEffect } from "react";
import Preload from "./Preload";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuizzes } from "../app/reducers/quizReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

function QuizContainer() {
  const { quizzes, isLoaded } = useSelector(getQuizzes);
  const totalQuizLength = quizzes.results.length;

  const [counter, setCounter] = useState(0);
  const [allOptions, setAllOptions] = useState(null);
  const [option_list, setOptionList] = useState(null);

  const [showResult, setShowResult] = useState(null);
  const [showQuiz, setShowQuiz] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [timerCount, setTimerCount] = useState(15);
  const [intervalval, setIntervalval] = useState();

  const history = useNavigate();

  const nextButton = useRef(null);
  const resultText = useRef(null);

  let quizTImevalue = 15;

  const inCorrectAnswers = quizzes.results[counter].incorrect_answers;
  const correctAnswer = quizzes.results[counter].correct_answer;
  const copiedAnswer = [...inCorrectAnswers];
  const answers = copiedAnswer.concat(correctAnswer);
  const strToDecode = quizzes.results[counter].question;

  const [theOptions, setTheOptions] = useState(shuffleAnswers(answers));
  // decode special character codes
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${strToDecode}`,
    "text/html"
  ).body.textContent;
  const decodedAnswer = parser.parseFromString(
    `<!doctype html><body>${correctAnswer}`,
    "text/html"
  ).body.textContent;

  function shuffleAnswers(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    if (counter !== 0) {
      setTheOptions(shuffleAnswers(answers));
    }
    console.log("hey");
  }, [counter]);

  useEffect(() => {
    const allOptions = document.querySelectorAll(".option");
    const option_list = document.querySelector(".option-list");
    const showResult = document.querySelector(".result-box");
    const showQuiz = document.querySelector(".show-quiz");
    console.log("hey 1");
    setOptionList(option_list);
    setShowResult(showResult);
    setShowQuiz(showQuiz);
    setAllOptions(allOptions);
    if (allOptions) {
      timerHandler(quizTImevalue);
    }

    return () => {
      setAllOptions(null);
      setOptionList(null);

      setShowResult(null);
      setShowQuiz(null);
    };
  }, []);

  const loadNextQue = () => {
    allOptions.forEach((option) => {
      option.classList.remove("disabled");
      if (
        option.classList.contains("correctActive") ||
        option.classList.contains("wrongActive")
      ) {
        option.classList.remove("correctActive");
        option.classList.remove("wrongActive");
      }
    });
    if (counter < totalQuizLength - 1) {
      setCounter(counter + 1);
      nextButton.current.style.display = "none";
      clearInterval(intervalval);
      timerHandler(quizTImevalue);
    } else {
      showResultHandler();
    }
  };
  const checkCorrectAnswer = (options, index) => {
    clearInterval(intervalval);
    if (options === decodedAnswer) {
      setQuizScore(quizScore + 1);
      allOptions[index].classList.add("correctActive");
    } else {
      allOptions[index].classList.add("wrongActive");

      for (let i = 0; i < option_list.children.length; i++) {
        if (option_list.children[i].textContent === decodedAnswer) {
          option_list.children[i].classList.add("correctActive");
        }
      }
    }
    allOptions.forEach((option) => {
      option.classList.add("disabled");
    });
    nextButton.current.style.display = "block";
  };

  const timerHandler = (time) => {
    let timeCount = setInterval(() => {
      setTimerCount((time -= 1));
      if (time == 0) {
        clearInterval(timeCount);

        allOptions.forEach((option) => {
          if (option.textContent === decodedAnswer) {
            option.classList.add("correctActive");
          }
        });
        allOptions.forEach((option) => {
          option.classList.add("disabled");
        });
        nextButton.current.style.display = "block";
      }
    }, 1000);

    setIntervalval(timeCount);
  };

  const showResultHandler = () => {
    showResult.classList.add("activeResult");
    showQuiz.classList.add("activeQuiz");

    if (quizScore < 6) {
      const showResultText = `<span> Very poor 😕 you got <p>${quizScore}</p> out of <p>${totalQuizLength}</p></span>
      <h2>${(quizScore / totalQuizLength) * 100}%</h2>
      `;
      resultText.current.innerHTML = showResultText;
    } else {
      const showResultText = `<span>Genius 😎 you got <p>${quizScore}</p> out of <p>${totalQuizLength}</p></span>
      <h2>${(quizScore / totalQuizLength) * 100}%</h2>
      `;
      resultText.current.innerHTML = showResultText;
    }
  };

  const resultHandler = () => {
    history("/");
    window.location.reload(false);
  };

  return (
    <>
      <Preload />
      {!isLoaded && (
        <QuizBox>
          <div className="show-quiz">
            <header>
              <div className="title">Quiz Up</div>
              <div className="timer">
                <div className="time-text">Time Left</div>
                <div
                  className={`time-sec ${timerCount <= 5 ? "time-off" : ""}`}
                >
                  {timerCount}
                </div>
              </div>
            </header>
            <section>
              <div className="que-text">
                <span>{decodedString}</span>
              </div>
              <div className="option-list">
                {theOptions.map((options, index) => (
                  <div
                    className="option"
                    onClick={() => checkCorrectAnswer(options, index)}
                    key={index}
                  >
                    <span>
                      {
                        parser.parseFromString(
                          `<!doctype html><body>${options}`,
                          "text/html"
                        ).body.textContent
                      }
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <footer>
              <div className="total-que">
                <span>
                  <p>{counter + 1}</p>of<p>{totalQuizLength}</p>Questions
                </span>
              </div>
              <button
                className="next-btn"
                onClick={loadNextQue}
                ref={nextButton}
              >
                Next Que
              </button>
            </footer>
          </div>
        </QuizBox>
      )}
      <ResultBox>
        <div className="result-box">
          <div className="icon">
            <FontAwesomeIcon icon={faCrown} />
          </div>

          <div className="complete-text">You've completed the Quiz!</div>
          <div className="score-text" ref={resultText}></div>
          <div className="buttons">
            <button onClick={() => resultHandler()}>Go back home</button>
          </div>
        </div>
      </ResultBox>
    </>
  );
}

const QuizBox = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: #e0e0e0;

  .show-quiz {
    width: 30rem;
    box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff;
    border-radius: 0.3rem;
    @media screen and (max-width: 700px) {
      width: 25rem;
    }
    @media screen and (max-width: 450px) {
      max-width: 23rem;
    }
    @media screen and (max-width: 380px) {
      max-width: 20rem;
    }
    .timer {
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
    }
  }

  .show-quiz.activeQuiz {
    opacity: 0;
    pointer-events: none;
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
    .option-list {
      padding: 1.25rem 0;
      display: block;
      .option {
        background: #f0f0f0;
        border: 1px solid #e6e6e6;
        border-radius: 0.3rem;
        padding: 0.8rem 0.9rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.3s ease;
        &:last-child {
          margin-bottom: 0;
        }
        &:hover {
          background: #19bc8b;
          color: white;
        }
      }
      .option.correctActive {
        background: #19bc8b;
        color: #ffffff;
      }
      .option.wrongActive {
        background: #e29a9a;
        color: #ffffff;
        border: 1px solid #e29a9a;
      }
      .option.disabled {
        pointer-events: none;
      }
    }
    @media screen and (max-width: 700px) {
      .que-text {
        font-size: 1.1rem;
      }
      .option-list {
        .option {
          font-size: 0.9rem;
        }
      }
    }
    @media screen and (max-width: 500px) {
      padding: 1.2rem 1rem 1.2rem 1rem;
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
    .next-btn {
      display: none;
      padding: 0.7rem 0.8rem;
      border-radius: 0.3rem;
      border: none;
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
    @media screen and (max-width: 500px) {
      padding: 0 1rem;
    }
  }
`;

const ResultBox = styled.div`
  .result-box {
    position: absolute;
    width: 28rem;
    padding: 1.6rem 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    opacity: 0;
    display: none;
    pointer-events: none;
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
  }
  .result-box.activeResult {
    opacity: 1;
    display: flex;
    text-align: center;
    pointer-events: auto;
    z-index: 999;
  }

  .complete-text {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .score-text span {
    display: flex;
    margin: 0.6rem 0;
    font-size: 1.12rem;
    font-weight: 400;
    p {
      font-weight: 600;
      padding: 0 0.4rem;
    }
  }
  .buttons {
    margin: 1.25rem 0;
    button {
      padding: 0.7rem 0.8rem;
      border-radius: 0.3rem;
      border: none;
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
`;
export default QuizContainer;
