import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import generalKnowledge from "../components/images/gk.png";
import music from "../components/images/music.png";
import science from "../components/images/science.png";
import sport from "../components/images/ball.png";
import tv from "../components/images/tv.png";
import game from "../components/images/game.png";
import animals from "../components/images/animals.png";
import maths from "../components/images/maths.png";
import anime from "../components/images/anime.png";
import Preload from "./Preload";

export default function Home() {
  const [error, setError] = useState("");

  const {
    logout,
    currentUser,
    categoryNumber,
    setCategoryNumber,

    setCategory,
  } = useAuth();

  const history = useNavigate();

  console.log(categoryNumber);
  const logOutHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to sign out");
    }
  };

  const quizCategories = [
    {
      category: "General Knowledge",
      categoryNo: 9,
    },
    {
      category: "Music",
      categoryNo: 12,
    },
    {
      category: "Science",
      categoryNo: 17,
    },
    {
      category: "Sports",
      categoryNo: 21,
    },
    {
      category: "TV",
      categoryNo: 14,
    },
    {
      category: "Video Games",
      categoryNo: 15,
    },
    {
      category: "Animals",
      categoryNo: 27,
    },
    {
      category: "Mathematics",
      categoryNo: 19,
    },
    {
      category: "Anime",
      categoryNo: 31,
    },
  ];
  const quizHandler = (e) => {
    quizCategories.map((categories) => {
      if (
        e.target.textContent === categories.category ||
        e.target.alt === categories.category
      ) {
        setCategoryNumber(categories.categoryNo.toString());
        setCategory(categories.category);
      }
    });
    console.log(e.target.alt);

    history("/quiz");
  };

  return (
    <>
      <HomeContainer>
        <div className="container">
          {error && <div>{error}</div>}

          <button onClick={logOutHandler}>Log out</button>
          <div className="home-content">
            <div className="header">
              <h1>Pick a category</h1>
            </div>
            <div className="categories">
              <div className="category-content">
                <div onClick={quizHandler}>
                  <span>
                    <img src={generalKnowledge} alt="General Knowledge" />
                  </span>
                  General Knowledge
                </div>
                <div onClick={quizHandler}>
                  <span>
                    <img src={science} alt="Science" />
                  </span>
                  Science
                </div>
                <div onClick={quizHandler}>
                  <span>
                    <img src={animals} alt="Animals" />
                  </span>
                  Animals
                </div>
              </div>
              <div className="category-content">
                <div onClick={quizHandler}>
                  <span>
                    <img src={music} alt="Music" />
                  </span>
                  Music
                </div>
                <div onClick={quizHandler}>
                  <span>
                    <img src={sport} alt="Sports" />
                  </span>
                  Sports
                </div>
                <div onClick={quizHandler}>
                  <span>
                    <img src={maths} alt="Mathematics" />
                  </span>
                  Mathematics
                </div>
              </div>
              <div className="category-content">
                <div onClick={quizHandler}>
                  <span>
                    <img src={tv} alt="TV" />
                  </span>
                  TV
                </div>
                <div onClick={quizHandler}>
                  <span>
                    <img src={game} alt="Video Games" />
                  </span>
                  Video Games
                </div>
                <div onClick={quizHandler}>
                  <span>
                    <img src={anime} alt="Anime" />
                  </span>
                  Anime
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  padding: 2rem 5rem;
  min-height: 100vh;
  background: #e0e0e0;
  button {
    padding: 0.7rem 1.5rem;
    outline: none;
    border: none;
    border-radius: 0.3rem;
    background: #e0e0e0;
    box-shadow: 20px 20px 47px #cecece, -20px -20px 47px #f2f2f2;
    cursor: pointer;
    color: #808080;
    text-transform: capitalize;
    font-weight: 600;
    font-family: "Nunito Sans", sans-serif;
    transition: all 0.3s ease-out;
    &:focus {
      box-shadow: inset 20px 20px 47px #cecece, inset -20px -20px 47px #f2f2f2;
    }
  }
  .home-content {
    .header {
      text-align: center;
      color: #5a5a5a;
    }
    .categories {
      padding-top: 2rem;
      max-width: 45rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      column-gap: 5rem;

      .category-content div {
        border-radius: 0.3rem;
        border-radius: 10px;

        background: #e0e0e0;
        box-shadow: inset 20px 20px 47px #cecece, inset -20px -20px 47px #f2f2f2;
        color: #808080;
        width: 12rem;

        padding: 2rem 0rem;
        text-align: center;
        margin-bottom: 2rem;
        cursor: pointer;
        span {
          display: block;
          padding-bottom: 0.5rem;
          img {
            width: 5rem;
            height: 5rem;
            object-fit: contain;
          }
        }
      }
    }
  }
`;
