import { SocketWrapper } from './socket';

let socket: SocketWrapper | null = null;

export default defineNuxtPlugin(() => ({
  provide: {
    Socket: () => {
      const token = useCookie('token');
      if (!token) {
        navigateTo('/auth/login');
        return;
      }

      if (socket === null) {
        socket = new SocketWrapper(token.value);
      }

      return socket!;
    },
  },
}));
