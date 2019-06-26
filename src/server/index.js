import { io, app } from 'fullstack-system';

let value = 0;

io.on('connection', (socket) => {
  socket.emit('value', value);
  socket.on('click', () => {
    value += 1;
    io.sockets.emit('value', value);
  });
});
