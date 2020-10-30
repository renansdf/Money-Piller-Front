import styled, { css } from 'styled-components';

interface IFormProps {
  isActive: boolean;
};

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 98vh;
  justify-content: flex-start;

  h1{
    top: 20px;
    color: #3405A2;
    font-weight: 900;
  }

`;

export const FormsContainer = styled.div<IFormProps>`
  position: fixed;
  bottom: 0px;
  width: 90%;
  max-width: 400px;
  border-radius: 50px;
  border-top-left-radius: 20px;
  background-color: #FF6DFA;

  &.left{
    left: calc(50% - 450px);
  }

  &.right{
    left: calc(50% + 50px);
  }

  &.updateValue{
    left: 30px;
    width: 200px;
    h2{
      font-size: 18px;
      text-align: center;
    }
  }
  
  transition: transform .4s;
  transform: translateY(70%);

  form {
    width: 100%;
    max-width: 100%;
    color: #3405A2;
    padding: 30px 0;

    div{
      flex-direction: row;
      width: 90%;
      justify-content: flex-start;

      > label {
        width: 150px;
        text-align: right;
        padding-right: 7px;
      }
      > input{
        width: 100px;
      }
    }
    
    div + div{
      margin-top: 10px;
    }

    h2{
      margin-top: 0px;
      margin-bottom: 10px;
    }
    
    input{
      width: 90%;
    }

    input + input{
      margin-top: 10px;
    }

    button{
      margin-top: 15px;
      border: none;
      border-radius: 30px;
      background: #3405A2;
      color: #fff;
      padding: 6px 20px;
    }
  }

  > button{
    position: absolute;
    top: -10px;
    right: -10px;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #3405A2;
    color: #fff;
    font-size: 11px;
    transition: all .4s;
    transform: rotateZ(180deg);

    &:focus{
      outline: none;
    }
  }

  ${props => props.isActive && css`
    transform: translateY(-60px);

    > button{
      background: red;
      transform: rotateZ(0deg);
    }
  `}


`;

export const UsersContainer = styled.div`
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
`;

export const User = styled.div`
  margin: 0 20px;
  width: 200px;
  min-width: 200px;
  padding: 20px;
  background: #3405A2;
  color: #fff;
  border-radius: 20px;

  h2, p{
    margin: 0 0 10px 0;
    text-align: center;
  }

  span{
    font-size: 12px;
    text-align: center;
  }

`;

export const ValueLeft = styled.div`
    justify-content: center;
    font-weight: 700;
    margin: 14px 0 3px;
`;

export const ProposalsContainer = styled.div`
  width: 100%;
  flex-direction: row; 
  justify-content: flex-start;
  align-items: stretch;
`;

export const Proposal = styled.div`
  border: 1px solid #3405A2;
  border-radius: 20px;
  padding: 20px; 
  margin: 10px;
  position: relative;

  h2{
    margin: 0 0 5px;
    color:#3405A2;
  }

  p{
    margin: 0;
    color: #3405A2;
  }

  p + p{
    margin-top: 5px;
  }

  button{
    background:#ff6dfa;
    margin-top: 10px;
    border: none;
    border-radius: 20px;
    color: #fff;
    line-height: 1em;
    letter-spacing: 1px;
    padding: 3px 8px 4px;
    box-shadow: 0px 2px 9px -4px #3405a2;
    cursor: pointer;
    transition: background .4s;

    &:hover{
      background: #3405a2;
    }
  }
`;

export const ValidatedContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  
  span{
    background: #ff6dfa;
    color: #fff;
    border-radius: 21px;
    padding: 2px 7px;
    line-height: 1em;
    font-size: 12px;
  }

  span + span{
    margin-top: 5px;
  }
`;