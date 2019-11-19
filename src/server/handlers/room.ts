import { GameSocket, rooms } from '..';

import generateRoomCode from '../utils/generateRoomCode';
import { io } from 'fullstack-system';

export default function(socket: GameSocket) {
  socket.on('createRoom', (username: string) => {

    // Generate room codes until we get a unique one.
    let roomCode;
    do {
      roomCode = generateRoomCode();
    }while(Object.keys(rooms).includes(roomCode));

    // Add the room code to the used room codes list.
    rooms[roomCode] = {
      roomCode,
      players: [username],
      turn: 0,
      gameData: [
        [
          { isMarked: false },
          { isMarked: false },
          { isMarked: false }
        ],
        [
          { isMarked: false },
          { isMarked: false },
          { isMarked: false },
          { isMarked: false },
          { isMarked: false }
        ],
        [
          { isMarked: false },
          { isMarked: false },
          { isMarked: false },
          { isMarked: false },
          { isMarked: false },
          { isMarked: false },
          { isMarked: false }
        ]
      ]
    };

    // Set some socket data.
    socket.username = username;
    socket.roomCode = roomCode;

    // Join the Socket.IO room.
    socket.join(roomCode);

    // Send the data back.
    socket.emit('getInitalRoomData', rooms[roomCode]);
  });

  socket.on('joinRoom', (username: string, roomCode: string) => {
    // Check if the room exists.
    if(!Object.keys(rooms).includes(roomCode)) {
      socket.emit('loginError', 'Room does not exist.');

      return;
    }

    // Add the player to the object.
    rooms[roomCode].players.push(username);

    // Set some Socket data.
    socket.username = username;
    socket.roomCode = roomCode;

    // Send ready room data to players.
    io.sockets.to(socket.roomCode).emit('updatedRoomData', rooms[roomCode]);
  });
}
