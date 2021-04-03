import styled, { css } from 'styled-components';

interface IFormProps {
  isActive: boolean;
};

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 98vh;
  justify-content: flex-start;

  h2{
    position: absolute;
    top: 30px;
    left: 40px;
    color: #fff;
    font-size: 32px;
    letter-spacing: 1px;
  }
`;

export const Header = styled.div`
  width: 100%;
  min-height: 10vh;
  padding: 10px 0 10px 40px;
  
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  h1{
    color: #3405A2;
  }

  button{
    border: 1px solid #a823a3;
    border-radius: 30px;
    color: #a823a3;
    background: none;
    padding: 7px 18px;
    margin-left: 15px;
  }
`;

export const FormsContainer = styled.div<IFormProps>`
  position: absolute;
  top: 90px;
  bottom: 0px;
  right:0px;
  left: 0px;
  width: 100%;
  background: none;
  z-index: 10;
  display: none;

  &.userForm{
    background:#3405a2;
  }

  &.proposalForm{
    background: #a823a3;

    label{
      color: #fff;
    }
  }

  &.headerForm{
    top: 0;
    background: #fff;
    h2{
      color: #3405A2;
      font-size: 20px;
      margin-bottom: 0px;
      position: relative;
      top: auto;
      left: auto;
      margin-right: 20px;
    }

    >button{
      top: auto;
      svg{
        stroke: #a823a3;
      }
    }

    form{
      max-width: 100%;
      padding: 0 27px;
      flex-direction: row;
      height: 100%;
      justify-content: flex-start;

      input{
        max-width: 200px;
        border: 1px solid #a823a3;
        border-radius: 30px;
        color: #a823a3;
      }

      button{
        margin-top: 0px;
        border: 1px solid #a823a3;
        border-radius: 30px;
        color: #a823a3;
      }
    }
  }
  
  form {
    width: 100%;
    max-width: 400px;
    color: #3405A2;
    padding: 30px 0;

    div{
      flex-direction: row;
      width: 90%;
      justify-content: flex-start;
      margin-bottom: 15px;

      > label {
        width: 150px;
        text-align: right;
        padding-right: 7px;
      }
      > input{
        width: 100px;
      }
    }
    
    h2{
      margin-top: 0px;
      margin-bottom: 10px;
    }
    
    input{
      width: 90%;
      max-width: 300px;
    }

    input + input{
      margin-top: 10px;
    }

    button{
      margin-top: 15px;
      border: none;
      border-radius: 30px;
      background: #fff;
      color: #3405A2;
      padding: 6px 20px;
    }
  }

  > button{
    position: absolute;
    top: 48%;
    right: 20px;
    border: none;
    width: auto;
    height: auto;
    border-radius: 50%;
    background: none;
    color: #fff;
    font-size: 11px;
    transition: all .4s;
    transform: rotateZ(180deg);

    cursor: pointer;

    &:focus{
      outline: none;
    }
  }

  ${props => props.isActive && css`
    display: flex;

    > button{
      transform: rotateZ(0deg);
    }
  `}


`;

export const UsersContainer = styled.div`
  position: relative;
  flex-direction: row;
  width: 100%;
  min-height: 45vh;
  background: #3405A2;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 90px 20px 20px;
`;

export const User = styled.div`
  margin: 0 20px 40px;
  width: 200px;
  min-width: 200px;
  padding: 20px;
  background: #fff;
  color: #3405A2;
  border-radius: 20px;

  h3, p{
    margin: 0 0 10px 0;
    text-align: center;
  }

  span{
    font-size: 12px;
    text-align: center;
  }


`;

export const AddUser = styled.button`
  border: 2px dashed #fff;
  background: none;
  color: #fff;
  border-radius: 20px;
  margin: 0 20px;
  width: 200px;
  min-width: 200px;
  padding: 20px;

  cursor: pointer;

  svg{
    margin-bottom: 10px;
  }
`;

export const AddProposal = styled.button`
  border: 2px dashed #fff;
  background: none;
  color: #fff;
  border-radius: 20px;
  margin: 0 20px;
  width: 200px;
  min-width: 200px;
  padding: 20px;

  cursor: pointer;

  svg{
    margin-bottom: 10px;
  }
`;

export const ValueLeft = styled.div`
  display: block;
  font-weight: 700;
  margin: 14px 0 3px;
  text-align: center;
  color: #fff;
`;

export const ProposalsContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 45vh;
  flex-direction: row; 
  justify-content: flex-start;
  align-items: center;
  background: #a823a3;
  padding: 90px 20px 20px;
`;

export const Proposal = styled.div`
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 20px; 
  margin: 10px;
  position: relative;

  h3{
    margin: 0 0 5px;
    color:#fff;
  }

  p{
    margin: 0;
    color: #fff;
  }

  p + p{
    margin-top: 5px;
  }

  button{
    background:#3405a2;
    margin-top: 10px;
    border: none;
    border-radius: 20px;
    color: #fff;
    line-height: 1em;
    letter-spacing: 1px;
    padding: 3px 8px 4px;
    cursor: pointer;
    transition: background .4s;

    &:hover{
      background: #fff;
    }
  }
`;



export const ValidatedContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  
  span{
    background: #fff;
    color: #3405a2;
    border-radius: 21px;
    padding: 2px 7px;
    line-height: 1em;
    font-size: 12px;
  }

  span + span{
    margin-top: 5px;
  }
`;