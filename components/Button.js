import React from "react";
import styled from "styled-components";

function Button({ children, onClick, backgroundColor }) {
  return (
    <StyledButton backgroundColor={backgroundColor} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 0;
  border-radius: 8px;
  color: white;
  width: fit-content;
  height: 30px;
  font-size: 16px;
`;
export default Button;
