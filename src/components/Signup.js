import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useNavigate();
  const { signup, currentUser } = useAuth();

  function validateEmail(emailRef, passwordRef) {
    let emailValidate = validator.isEmail(emailRef.current.value);

    if (!emailValidate) {
      setError("Please enter a valid email");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else if (passwordRef.current.value.length < 6) {
      setError("Your password must be at least 6 characters");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    validateEmail(emailRef, passwordRef);

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch (error) {
      setError("Failed to signup account");
    }

    setLoading(false);
  };
  return (
    <>
      <SignupContainer>
        <form onSubmit={signUpHandler}>
          {error && <div className="errorMessage">{error}</div>}
          <div className="form-header">
            <h3>Sign up with your email</h3>
            <span>
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
          </div>
          <div className="input-text">
            <input
              type="text"
              name="fname"
              className="form-input"
              placeholder=" "
              ref={firstName}
            />
            <label htmlFor="text" className="form-label">
              First name
            </label>
          </div>

          <div className="input-text">
            <input
              type="text"
              name="lname"
              className="form-input"
              placeholder=" "
              ref={lastName}
            />
            <label htmlFor="text" className="form-label">
              Last name
            </label>
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
            <button type="submit" disabled={loading}>
              Create account
            </button>
          </div>
        </form>
      </SignupContainer>
    </>
  );
}

const SignupContainer = styled.div`
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
