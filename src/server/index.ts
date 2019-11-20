import { io } from 'fullstack-system';
import { Socket } from 'socket.io';

import { Game } from '../shared/types';

import setupLogin from './handlers/login';
import setupRoom from './handlers/room';

export const rooms: { [type: string]: Game } = {};

export interface GameSocket extends Socket {
  username: string;
  roomCode: string;
}

io.on('connection', (socket: GameSocket) => {
  // Add out handlers.
  setupLogin(socket);
  setupRoom(socket);
});
