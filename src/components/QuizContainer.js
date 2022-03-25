import React, { useState, useRef, useEffect } from "react";
import Preload from "./Preload";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuizzes } from "../app/reducers/quizReducer";

function QuizContainer() {
  const { quizzes, isLoaded } = useSelector(getQuizzes);
  const totalQuizLength = quizzes.results.length;
  // console.log(quizzes, isLoaded);
  const [counter, setCounter] = useState(0);
  const [allOptions, setAllOptions] = useState(null);
  const [option_list, setOptionList] = useState(null);
  const [quizTimer, setQuizTimer] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [showQuiz, setShowQuiz] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [shuffleArray, setShuffleArray] = useState([]);

  // const [showAnswer, setShowAnswer] = useState(false);

  const history = useNavigate();
  // console.log(showResult);
  const nextButton = useRef(null);
  const resultText = useRef(null);
  console.log(resultText);
  // console.log(nextButton.current);

  let timeCount;
  let quizTImevalue = 15;
  let score = 0;

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
  }, [counter]);

  // let shuffledAnswers = () => {
  //   console.log("fsd");
  //   return shuffleAnswers(answers);
  // };
  //console.log(shuffledAnswers, totalQuizLength);
  useEffect(() => {
    const allOptions = document.querySelectorAll(".option");
    const option_list = document.querySelector(".option-list");
    const timerValue = document.querySelector(".timer .time-sec");
    const showResult = document.querySelector(".result-box");
    const showQuiz = document.querySelector(".show-quiz");
    console.log(allOptions);
    setAllOptions(allOptions);
    setOptionList(option_list);
    setQuizTimer(timerValue);
    setShowResult(showResult);
    setShowQuiz(showQuiz);
    //setShuffleArray(shuffleAnswers(answers));
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
      // timerHandler(quizTImevalue);
    } else {
      console.log("quiz completed");
      // console.log(showResult);
      showResultHandler();

      // setShowAnswer(true);
      // console.log(showAnswer);
    }
  };
  const checkCorrectAnswer = (options, index) => {
    if (options === decodedAnswer) {
      score += 1;
      setQuizScore(quizScore + 1);
      console.log(quizScore);
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
    timeCount = setInterval(() => {
      quizTimer.textContent = time;
      time--;
    }, 1000);
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

  const resultHandler = (e) => {
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
                <div className="time-sec">15</div>
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
          <div className="icon">crown icon here</div>

          <div className="complete-text">You've completed the Quiz!</div>
          <div className="score-text" ref={resultText}></div>
          <div className="buttons">
            <button onClick={(e) => resultHandler(e)}>Go back home</button>
          </div>
        </div>
      </ResultBox>
    </>
  );
}

const QuizBox = styled.div`
  .show-quiz {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30rem;
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    border-radius: 0.3rem;
  }

  .show-quiz.activeQuiz {
    opacity: 0;
    pointer-events: none;
  }
  header {
    position: relative;
    z-index: 99;
    height: 4.4rem;
    padding: 0 2rem;
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
      font-size: 1.6rem;
      font-weight: 600;
    }
    .option-list {
      padding: 1.25rem 0;
      display: block;
      .option {
        background: aliceblue;
        border: 1px solid #19bc8b;
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
  }
  footer {
    height: 4.4rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    pointer-events: none;
  }
  .result-box.activeResult {
    opacity: 1;
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
