import { Socket } from 'socket.io-client';
import * as events from './events';

const callback = (
  name: string, 
  func: (socket: Socket, payload: object) => object | null | void, 
  socket: Socket, 
  payload: object, 
) => {
  const ret = func(socket, payload);
  if (ret != null) socket.emit(name, ret);
};

export const register = (socket: Socket) => {
  socket.on('example', (payload) =>
    callback('example', events.example, socket, payload),
  );
  socket.on('privateMessage', (payload) =>
    callback('privateMessage', events.privateMessage, socket, payload),
  );
};