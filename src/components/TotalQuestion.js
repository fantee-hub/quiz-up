import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

const TotalQuestion = ({ dispatch }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [categoryContent, setCategoryContent] = useState(5);
  const handleSetCategoryContent = (amount) => {
    setCategoryContent(amount);
    setToggleDropdown(false);
    dispatch({ type: "newAmount", payload: amount });
  };
  const options = [5, 10, 15, 20, 25];

  return (
    <DropdownContainer>
      <h2>Total Questions</h2>
      <button onClick={() => setToggleDropdown((prev) => !prev)}>
        {categoryContent}
        {!toggleDropdown ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
      </button>
      {toggleDropdown && (
        <div className="dropdown-content">
          {options.map((item, i) => (
            <div
              key={i}
              className="dropdown-list-container"
              onClick={() => handleSetCategoryContent(item)}
            >
              <div className="dropdown-list">{item}</div>
            </div>
          ))}
        </div>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 340px;

  justify-content: center;
  align-items: center;
  h2 {
    padding-bottom: 2rem;
  }
  button {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 18px;
    font-family: "Nunito Sans", sans-serif;
  }
  .dropdown-content {
    position: absolute;
    top: 160px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    height: 350px;
    overflow-y: scroll;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
    &::-webkit-scrollbar {
      display: none;
    }
    .dropdown-list-container {
      width: 100%;
    }
    .dropdown-list {
      padding: 16px;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }
  }
`;

export default TotalQuestion;
