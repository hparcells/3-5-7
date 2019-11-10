import { io } from 'fullstack-system';
import { Socket } from 'socket.io';

export default function(socket: Socket) {
  setTimeout(() => {
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  }, 500);
}
