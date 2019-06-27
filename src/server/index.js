import { io, app } from 'fullstack-system';
import generateRoomCode from 'utils/generateRoomCode';
import { removeBy } from '@reverse/array';

const game = {};

io.on('connection', (socket) => {
  function leaveRoom() {
    socket.leave(socket.roomCode);
    delete game.roomCode;
  }
  function roomExists(roomCode) {
    return Object.keys(game).includes(roomCode);
  }

  socket.on('requestCode', (username) => {
    const roomCode = generateRoomCode();

    socket.emit('recieveCode', roomCode);
    game[roomCode] = {
      marks: Array(15).fill(false),
      turn: 0,
      players: [ username ]
    };

    socket.username = username;
    socket.roomCode = roomCode;
    socket.join(roomCode);
  });
  socket.on('joinRoom', (username, roomCode) => {
    if(!roomExists(roomCode)) {
      socket.emit('roomDoesNotExist');
      return;
    }

    socket.username = username;
    socket.roomCode = roomCode;
    socket.join(roomCode);

    game[roomCode].players.push(username);

    io.sockets.to(socket.roomCode).emit('gameStart');
  });

  socket.on('leaveRoom', () => {
    leaveRoom();
    io.sockets.to(socket.roomCode).emit('roomDestroyed');
  });
  socket.on('disconnect', () => {
    leaveRoom();
    io.sockets.to(socket.roomCode).emit('roomDestroyed');
  });
});
