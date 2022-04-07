import React from "react";
import styled from "styled-components";

function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
const StyledButton = styled.button`
  background-color: green;
  border: 0;
  border-radius: 8px;
  color: white;
  width: 100px;
  height: 30px;
`;
export default Button;
