import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <SigninContainer>
        <form>
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
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="eye" onClick={passwordHandler}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
          </div>

          <div className="create-account">
            <button type="submit">Sign in</button>
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
  form {
    min-width: 30rem;
    padding: 2rem 3rem;
    border-radius: 0.7rem;
    background: #ffffff;
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
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
    }
  }
`;
