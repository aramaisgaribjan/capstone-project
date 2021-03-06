import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  font-family: 'Lato', sans-serif;  
  max-width: 100%;
  height: 100%;
  background-color: white;
}

a {
  color: inherit;
  text-decoration: none;
}
`;
