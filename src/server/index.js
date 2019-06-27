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

    io.sockets.to(socket.roomCode).emit('gameStart', game[socket.roomCode]);
  });
  socket.on('requestFirstTimeGameData', () => {
    io.sockets.to(socket.roomCode).emit('updatedGameData', game[socket.roomCode]);
  });
  socket.on('updatedMarks', (newMarks) => {
    game[socket.roomCode].marks = newMarks;
    io.sockets.to(socket.roomCode).emit('updatedGameData', game[socket.roomCode]);

    if(!newMarks.includes(false)) {
      const turn = game[socket.roomCode].turn;
      let winner;
      if(turn === 0) {
        winner = 1;
      }else {
        winner = 0;
      }

      io.sockets.to(socket.roomCode).emit('winner', winner);
    }
  });
  socket.on('nextTurn', () => {
    let turn = game[socket.roomCode].turn;
    if(turn === 0) {
      turn = 1;
      game[socket.roomCode].turn = turn;
    }else {
      turn = 0;
      game[socket.roomCode].turn = turn;
    }

    io.sockets.to(socket.roomCode).emit('updatedGameData', game[socket.roomCode]);
  });
  socket.on('leaveRoom', () => {
    leaveRoom();
    io.sockets.to(socket.roomCode).emit('roomDestroyed');
  });
  socket.on('disconnect', () => {
    leaveRoom();
    io.sockets.to(socket.roomCode).emit('roomDestroyed');

    console.log(game)
  });
});
