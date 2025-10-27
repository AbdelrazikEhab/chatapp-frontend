import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function connectSocket(token: string) {
  if (socket) return socket;
  socket = io((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') as string, {
    query: { token },
    transports: ['websocket']
  });
  return socket;
}

export function closeSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}
