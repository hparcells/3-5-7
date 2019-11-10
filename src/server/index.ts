import { io, app } from 'fullstack-system';
import { Socket } from 'socket.io';

import setupLogin from './handlers/login';

io.on('connection', (socket: Socket) => {
  setupLogin(socket);
});
