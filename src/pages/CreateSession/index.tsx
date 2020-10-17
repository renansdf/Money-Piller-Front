import React, { useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';
import api from '../../services/api';

import { Form } from '@unform/web';
import Input from '../../components/Input';


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

interface IUserProposalsData {
  name: string;
  value: number;
}

interface IUserProposalData {
  from: string;
  socket_id: string;
  user_proposals: IUserProposalsData[];
}

const CreateSession: React.FC = () => {
  const [socketId, setSocketId] = useState<string>('');
  const [sessionHash, setSessionHash] = useState<string>('hashid');
  const [currentUserName, setCurrentUserName] = useState<string>();
  const [warning, setWarning] = useState<string>();
  const [users, setUsers] = useState<IUserData[]>([]);
  const [allProposals, setAllProposals] = useState<IUserProposalData[]>();

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
  }

  const handleSendProposal = (data: IProposalData) => {
    const names = Object.keys(data);
    const user_proposals = names.map(name => {
      return { name: name, value: data[name] }
    });

    api.post('/proposal', {
      from: currentUserName,
      socket_id: socketId,
      user_proposals
    });
  }

  useEffect(() => {
    const socket = socketIoClient(`http://localhost:3333/?session_hash=${sessionHash}`);

    socket.on('userConnection', (data: string) => {
      setWarning(data);
      setSocketId(socket.id);
    });

    socket.on('updateUsers', (data: IUserData[]) => {
      console.log('updating Users');
      setUsers(data);
    });

    socket.on('updateProposals', (data: IUserProposalData[]) => {
      setAllProposals(data);
    });
  }, [sessionHash]);

  return (
    <div>
      <h1>warning: {warning}</h1>

      <Form onSubmit={handleSendUserData}>
        <Input name="name" />
        <Input name="monthly_cost" type="number" />
        <Input name="monthly_profit" type="number" />
        <Input name="balance" type="number" />
        <button type="submit">send user data</button>
      </Form>

      {users && users.map(user => (
        <div key={user.socket_id}>
          <p>socketId: {user.socket_id}</p>
          <h2>nome: {user.name}</h2>
          <p>custo: {user.monthly_cost}</p>
        </div>
      ))}

      <Form onSubmit={handleSendProposal}>

        {users && users.map(user => (
          <div>
            <label>{user.name}</label>
            <Input name={user.name} type="number" />
          </div>
        ))}
        <button type="submit">send proposal</button>
      </Form>

      {allProposals && allProposals.map(proposal => (
        <div>
          {proposal.from}
          {proposal.socket_id}
          {proposal.user_proposals.map(user_proposal => (
            <div>
              {user_proposal.name}
              -
              {user_proposal.value}
            </div>
          ))}
        </div>
      ))}
    </div>

  );
}

export default CreateSession;