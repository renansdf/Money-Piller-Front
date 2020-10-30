import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }

  div, form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  form{
    width: 90%;
    max-width: 400px;
    input{
      width: 90%;
    }
  }
  
  button:focus{
    outline: none;
  }
`;