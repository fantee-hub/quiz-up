import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderStyle>
      <h1>Welcome To The Ultimate Quiz-Down App</h1>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0 0 0;
`;
export default Header;
