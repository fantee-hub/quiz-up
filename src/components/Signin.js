import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "react-spinners/ClipLoader";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useNavigate();
  const { login } = useAuth();

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  const signInHandler = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Failed to Login");
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    setLoading(false);
  };

  const buttonDisable = {
    background: "#8a93f7",
  };
  const buttonEnable = {
    default: "#5b69fc",
  };
  return (
    <>
      <SigninContainer>
        <form onSubmit={signInHandler}>
          {error && <div className="errorMessage">{error}</div>}
          <div className="form-header">
            <h3>Sign in with your email</h3>
            <span>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </span>
          </div>

          <div className="input-text">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder=" "
              ref={emailRef}
            />
            <label htmlFor="email" className="form-label">
              Email address
            </label>
          </div>

          <div className="input-text">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder=" "
              ref={passwordRef}
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="eye" onClick={passwordHandler}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
          </div>

          <div className="create-account">
            <button
              type="submit"
              disabled={loading}
              style={loading ? buttonDisable : buttonEnable}
            >
              Sign in
            </button>
            <div className="spinner">
              <Loader color="#ffffff" loading={loading} size={35} />
            </div>
          </div>
        </form>
      </SigninContainer>
    </>
  );
}

const SigninContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  form {
    width: 30rem;
    padding: 2rem 3rem;
    border-radius: 0.7rem;
    background: linear-gradient(225deg, #cacaca, #f0f0f0);
    box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff;
    .errorMessage {
      text-align: center;
      background: #d0698b;
      padding: 0.7rem;
      border-radius: 0.3rem;
      margin-bottom: 0.7rem;
      width: 100%;
      font-weight: bold;
      color: #ffffff;

      transition: all 0.3s ease-in-out;
    }

    .form-header {
      padding: 0 0 1rem 0;
      a {
        font-weight: 600;
        color: #5b69fc;
      }
      span {
        font-size: 0.9rem;
      }
    }
    .input-text {
      position: relative;
      margin: 1rem 0;
      input {
        padding: 1.3rem 1rem 1rem 1rem;
        width: 100%;
        font-family: "Nunito Sans", sans-serif;
        border-radius: 0.3rem;
        font-size: 1rem;
        border: 1px solid #cad0c9;
        outline: none;
        background: #f0f0f0;
      }

      .eye {
        position: absolute;
        right: 1rem;
        top: 1.3rem;
        cursor: pointer;
      }
      label {
        position: absolute;
        left: 1rem;
        top: 1.1rem;
        color: #6d6d6d;
        cursor: text;
        transition: top 200ms ease-in, left 200ms ease-in,
          font-size 200ms ease-in;
      }
      .form-input:focus ~ .form-label,
      .form-input:not(:placeholder-shown).form-input:not(:focus) ~ .form-label {
        top: 0.2rem;
        font-size: 0.8rem;
        left: 1rem;
      }
    }
    .create-account {
      position: relative;
      button {
        width: 100%;
        padding: 1rem;
        cursor: pointer;
        border: none;
        border-radius: 0.3rem;
        font-family: "Nunito Sans", sans-serif;
        background: #5b69fc;
        font-weight: 600;
        color: #ffffff;
      }
      .spinner {
        position: absolute;
        right: 8rem;
        top: 0.5rem;
        text-align: center;
      }
    }
    @media screen and (max-width: 500px) {
      max-width: 25rem;
      padding: 2rem 1.5rem;
      .create-account {
        .spinner {
          right: 6rem;
        }
      }
    }
    @media screen and (max-width: 420px) {
      max-width: 23rem;
      padding: 2rem 1.5rem;
    }
    @media screen and (max-width: 380px) {
      max-width: 20rem;
    }
    @media screen and (max-width: 328px) {
      max-width: 18rem;
      padding: 2rem 1rem;
    }
  }
`;
