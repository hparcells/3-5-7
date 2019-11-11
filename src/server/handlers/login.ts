import { io } from 'fullstack-system';
import { Socket } from 'socket.io';

export default function(socket: Socket) {
  // I only use setTimeout here because *sometimes* the client never recieves this event.
  setTimeout(() => {
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  }, 100);

  socket.on('disconnect', () => {
    // Update th player count for everone else.
    io.sockets.emit('playerCount', Object.keys(io.sockets.sockets).length);
  });
}
