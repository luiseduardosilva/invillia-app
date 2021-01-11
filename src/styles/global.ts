import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    -webkit-font-smoothing: antialiased;
    background-color: #3f5c82;
  }
  body, input, button {
    font: 16px Roboto, sans-serif;
  }
  /* #root {
    max-width: 600px;
    margin: 0 auto;
    padding: 120px 20px;
  } */
`;
