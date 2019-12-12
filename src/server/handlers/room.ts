import { io } from 'fullstack-system';
import { remove } from '@reverse/array';
import { error, server } from 'log-type';

import generateRoomCode from '../utils/generateRoomCode';

import { GameSocket, rooms } from '..';

export default function(socket: GameSocket) {
  function leaveRoom() {
    // Check if the room exists in the server.
    if(!Object.keys(rooms).includes(socket.roomCode)) {
      error('Error when deleting room. Room does not exist. This should never happen.');
    }

    // If one player exists.
    if(rooms[socket.roomCode].players.length === 1) {
      if(!rooms[socket.roomCode].players.includes(socket.username)) {
        error('Error when deleting room. Player does not exist in room. This should never happen.');
        return;
      }

      // Remove the room from the server.
      delete rooms[socket.roomCode];

      // Log
      server(`Room '${socket.roomCode}' disbanded.`);

    }else if(rooms[socket.roomCode].players.length === 2) {
      // Remove the player from the room.
      rooms[socket.roomCode].players = remove(rooms[socket.roomCode].players, socket.username);

      // Send news to other player.
      io.sockets.to(socket.roomCode).emit('opponentDisconnect');
    }

    // Reset some values on the client;
    socket.emit('cleanUpClientMenu');

    // Leave the Socket.IO room.
    socket.leave(socket.roomCode);

    // Set some socket information.
    // This will not affect the socket if the socket is being disconnected.
    socket.roomCode = '';
  }

  socket.on('disconnect', () => {
    // If we are in a room.
    if(socket.roomCode) {
      // Leave the room.
      leaveRoom();
    }
  });

  socket.on('createRoom', (username: string) => {
    // EXtra error checking.
    if(socket.roomCode) {
      error('Error when creating room. Player is already in room. This should never happen.');
      return;
    }
    if(!/^[A-Za-z0-9-_]*$/gm.test(username)) {
      error('Error when creating room. Username is invalid. This should never happen.');
      return;
    }

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
      marks: [
        [
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false }
        ],
        [
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false }
        ],
        [
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false},
          { isMarked: false, isSelected: false },
          { isMarked: false, isSelected: false }
        ]
      ],
      activeRow: null as any,
      winner: null as any
    };

    // Set some socket data.
    socket.username = username;
    socket.roomCode = roomCode;

    // Join the Socket.IO room.
    socket.join(roomCode);

    // Send the data back.
    socket.emit('getInitalRoomData', rooms[roomCode]);

    // Log
    server(`Room '${roomCode}' created.`);
  });
  socket.on('joinRoom', (username: string, roomCode: string) => {
    // Error checking.
    if(socket.roomCode) {
      error('Error when joining room. Player is already in room. This should never happen.');
      socket.emit('loginError', 'Error when joining server. Please try again.');

      return;
    }
    if(!/^[A-Za-z0-9-_]*$/gm.test(username)) {
      error('Error when joining room. Username format is invalid. This should never happen.');
      socket.emit('loginError', 'Error when joining server. Please try again.');

      return;
    }
    if(!/^[A-Z0-9]*$/gm.test(roomCode)) {
      error('Error when joining room. Room code format is invalid. This should never happen.');
      socket.emit('loginError', 'Error when joining server. Please try again.');

      return;
    }

    // Check if the room exists.
    if(!Object.keys(rooms).includes(roomCode)) {
      socket.emit('loginError', 'Room does not exist.');

      return;
    }

    // Check if the username is the same as somebody in the room.
    if(rooms[roomCode].players.includes(username)) {
      socket.emit('loginError', 'The player in this room has the same username as you. Change your username.');

      return;
    }

    // Add the player to the object.
    rooms[roomCode].players.push(username);

    // Set some Socket data.
    socket.username = username;
    socket.roomCode = roomCode;

    // Join the Socket.IO room.
    socket.join(socket.roomCode);

    // Send ready room data to players.
    io.sockets.to(socket.roomCode).emit('updatedRoomData', rooms[roomCode]);
  });
  socket.on('leaveRoom', () => {
    if(!socket.roomCode) {
      error('Error when leaving room. Player is not in a room. This should never happen.');
      return;
    }

    // Leave the room.
    leaveRoom();
  });
}
