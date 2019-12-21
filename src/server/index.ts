import { io } from 'fullstack-system';
import { Socket } from 'socket.io';

import { Game } from '../shared/types';

import setupLogin from './handlers/login';
import setupRoom from './handlers/room';
import setupGame from './handlers/game';

export const rooms: { [type: string]: Game } = {};

/** An extended version of Socket.IO's Socket with username and room code keys. */
export interface GameSocket extends Socket {
  /** The username of the player on this socket. */
  username: string;
  /** The room that the player is connected to. */
  roomCode: string;
}

io.on('connection', (socket: GameSocket) => {
  // Add out handlers.
  setupLogin(socket);
  setupRoom(socket);
  setupGame(socket);
});
