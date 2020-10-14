import React, { useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';
import api from '../../services/api';

interface IUserData {
  socketId: string;
  id: string;
  name: string;
  session_hash: string;
  monthly_cost: number;
  monthly_profit: number;
  balance: number;
}

const CreateSession: React.FC = () => {
  const [socketId, setSocketId] = useState<string>('');
  const [warning, setWarning] = useState<string>();
  const [users, setUsers] = useState<IUserData[]>([]);

  const handleSubmit = () => {
    api.post('/user', {
      socketId,
      name: 'renan',
      session_hash: 'hash',
      monthly_cost: 3000,
      monthly_profit: 3000,
      balance: 0
    });
  }

  useEffect(() => {
    const socket = socketIoClient('http://localhost:3333/?session_hash=hashid');

    socket.on('userConnection', (data: string) => {
      setWarning(data);
      setSocketId(socket.id);
    });

    socket.on('updateUsers', (data: IUserData[]) => {
      console.log('updating Users');
      setUsers(data);
    })
  }, [users]);

  return (
    <div>
      <h1>warning: {warning}</h1>
      <button onClick={handleSubmit}>send user data</button>

      {users && users.map(user => (
        <div key={user.id}>
          <p>socketId: {user.socketId}</p>
          <h2>nome: {user.name}</h2>
          <p>custo: {user.monthly_cost}</p>
        </div>
      ))}
    </div>

  );
}

export default CreateSession;