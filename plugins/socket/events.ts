import { Socket } from 'socket.io-client';

export const example = (_socket: Socket, _payload: object) => {
  console.log('got example');
};

export const privateMessage = (_socket: Socket, _payload: object) => {
  console.log('got priv mes');
};
