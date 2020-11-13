import React, { useCallback, useEffect, useRef, useState } from 'react';
import socketIoClient from 'socket.io-client';
import api from '../../services/api';

import { Form } from '@unform/web';
import Input from '../../components/Input';
import { FiArrowDown, FiPlusCircle, FiXCircle } from 'react-icons/fi';

import { Container, Header, FormsContainer, UsersContainer, User, AddUser, ProposalsContainer, Proposal, AddProposal, ValueLeft, ValidatedContainer } from './styles';
import { FormHandles } from '@unform/core';


interface IUserData {
  socket_id: string;
  session_hash: string;
  name: string;
  monthly_cost: number;
  monthly_profit: number;
  balance: number;
}

interface IFormData {
  name: string;
  monthly_cost: number;
  monthly_profit: number;
  balance: number;
}

interface IProposalData {
  [key: string]: number;
}

interface IProposal {
  name: string;
  value: number;
}

interface IUsersValidated {
  validator_name: string;
  validator_socket_id: string;
}

interface IUserProposalData {
  from: string;
  socket_id: string;
  user_proposals: IProposal[];
  users_validated: IUsersValidated[];
}

const Session: React.FC = () => {
  const [socketId, setSocketId] = useState<string>('');
  const [sessionHash, setSessionHash] = useState<string>('hashid');

  const [warning, setWarning] = useState<string>();
  const [currentUserName, setCurrentUserName] = useState<string>();
  const [users, setUsers] = useState<IUserData[]>([]);
  const [allProposals, setAllProposals] = useState<IUserProposalData[]>();

  const [pileValue, setPileValue] = useState<number>(0);
  const [proposalValueLeft, setProposalValueLeft] = useState<number>();

  const [isUserFormActive, setIsUserFormActive] = useState(false);
  const [isProposalsFormActive, setIsProposalsFormActive] = useState(false);
  const [isPileUpdateActive, setIsPileUpdateActive] = useState(false);

  const proposalsForm = useRef<FormHandles>(null);

  const handleSendUserData = (data: IFormData) => {
    setCurrentUserName(data.name);
    api.post('/user', {
      socket_id: socketId,
      session_hash: sessionHash,
      name: data.name,
      monthly_cost: data.monthly_cost,
      monthly_profit: data.monthly_profit,
      balance: data.balance
    });
    setIsUserFormActive(!isUserFormActive);
  }

  const handleSendProposal = (data: IProposalData) => {
    const names = Object.keys(data);
    const user_proposals = names.map(name => {
      return { name: name, value: data[name] }
    });

    api.post('/proposal', {
      from: currentUserName,
      socket_id: socketId,
      user_proposals,
      users_validated: [{
        validator_name: currentUserName,
        validator_socket_id: socketId
      }]
    });
    setIsProposalsFormActive(!isProposalsFormActive);
  }

  const handleAgreeWithProposal = (proposal_socket_id: string) => {
    api.put('/proposal', {
      proposal_socket_id,
      add_name: currentUserName,
      add_socket_id: socketId
    })
  }

  const handleUpdatePileValue = useCallback((pileValue: number, { reset }) => {
    api.post('/pile', pileValue);
    reset();
    setIsPileUpdateActive(!isPileUpdateActive);
  }, [isPileUpdateActive]);

  const handleProposalValueLeftUpdate = useCallback(event => {
    let formData: object = {};
    if (proposalsForm && proposalsForm.current) {
      formData = proposalsForm.current.getData();
    }

    const values: string[] = Object.values(formData);
    const parsedValues = values.map(value => {
      const integer = parseInt(value);
      return (isNaN(integer) ? 0 : integer);
    });
    const proposalsTotal = parsedValues.reduce((accumulator, currentValue) => accumulator + currentValue);

    const valueLeft = pileValue - proposalsTotal;

    setProposalValueLeft(valueLeft);
  }, [pileValue]);

  useEffect(() => {
    const socket = socketIoClient(`http://localhost:3333/?session_hash=${sessionHash}`);

    socket.on('userConnection', (data: string) => {
      setWarning(data);
      setSocketId(socket.id);
    });

    socket.on('updateUsers', (data: IUserData[]) => {
      console.log(data);
      setUsers(data);
    });

    socket.on('updateProposals', (data: IUserProposalData[]) => {
      setAllProposals(data);
    });

    socket.on('updatePileValue', (newPileValue: number) => {
      setPileValue(newPileValue);
    })
  }, [sessionHash]);

  return (
    <Container>
      <Header>
        <h1>sala X, valor para divisao {pileValue}</h1>
        <button onClick={() => setIsPileUpdateActive(!isPileUpdateActive)}>mudar valor</button>

        <FormsContainer className="headerForm" isActive={isPileUpdateActive}>
          <Form onSubmit={handleUpdatePileValue}>
            <h2>atualizar valor do moneypille</h2>
            <Input type="number" name="pileValue" />
          </Form>
          <button onClick={() => setIsPileUpdateActive(!isPileUpdateActive)}><FiXCircle size={34} /></button>
        </FormsContainer>
      </Header>

      <UsersContainer>
        <h2>Participantes</h2>

        <AddUser onClick={() => setIsUserFormActive(!isUserFormActive)}>
          <FiPlusCircle size={50} />
          <p>Clique para acrescentar seus dados e participar da divisão</p>
        </AddUser>

        {users && users.map(user => (
          <User key={user.socket_id}>
            <h3>{user.name}</h3>
            <span>custo mensal</span>
            <p>R${user.monthly_cost}</p>
            <span>renda mensal</span>
            <p>R${user.monthly_profit}</p>
            <span>acumulado ou devendo</span>
            <p>R${user.balance}</p>
          </User>
        ))}

        <FormsContainer className="userForm" isActive={isUserFormActive}>
          <Form onSubmit={handleSendUserData}>
            <Input name="name" placeholder="nome" />
            <Input name="monthly_cost" type="number" placeholder="custo mensal" />
            <Input name="monthly_profit" type="number" placeholder="renda mensal" />
            <Input name="balance" type="number" placeholder="lucros ou dividendos" />
            <button type="submit">atualizar cadastro</button>
          </Form>

          <button onClick={() => setIsUserFormActive(!isUserFormActive)}><FiXCircle size={34} /></button>
        </FormsContainer>
      </UsersContainer>



      <ProposalsContainer>
        <h2>Propostas</h2>

        <AddProposal onClick={() => setIsProposalsFormActive(!isProposalsFormActive)}>
          <FiPlusCircle size={50} />
          <p>clique para fazer uma proposta de devisão entre todos os participantes</p>
        </AddProposal>

        {allProposals && allProposals.map(proposal => (
          <Proposal key={proposal.socket_id}>
            <h3>{proposal.from} propôs</h3>
            {proposal.user_proposals.map(user_proposal => (
              <p key={user_proposal.name}>{user_proposal.name}: R${user_proposal.value}</p>
            ))}
            <ValidatedContainer>
              {proposal.users_validated.map(validated => (
                <span key={validated.validator_socket_id}>{validated.validator_name}</span>
              ))}
            </ValidatedContainer>
            {proposal.socket_id !== socketId && (
              <button onClick={() => handleAgreeWithProposal(proposal.socket_id)}>concordar</button>
            )}
          </Proposal>
        ))}

        <FormsContainer className="proposalForm" isActive={isProposalsFormActive}>
          <Form ref={proposalsForm} onSubmit={handleSendProposal}>
            {users && users.map(user => (
              <div key={user.socket_id}>
                <label>{user.name}</label>
                <Input name={user.name} type="number" onChange={handleProposalValueLeftUpdate} />
              </div>
            ))}
            {proposalValueLeft && (
              <ValueLeft>restam {proposalValueLeft}</ValueLeft>
            )}
            <button type="submit">atualizar proposta</button>
          </Form>

          <button onClick={() => setIsProposalsFormActive(!isProposalsFormActive)}><FiXCircle size={34} /></button>
        </FormsContainer>
      </ProposalsContainer>
    </Container>

  );
}

export default Session;