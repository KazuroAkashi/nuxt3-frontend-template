import { Socket, io } from 'socket.io-client';
import { register } from './event-listener';

export class SocketWrapper {
  private socket: Socket | null = null;

  constructor(token: string) {
    if (!process.client) return;

    this.socket = io(process.env.BACKEND_URL as string, {
      auth: {
        jwt_token: token,
        intents: ['EXAMPLE'],
      },
      reconnectionAttempts: 3,
    });

    register(this.socket);
  }
}
