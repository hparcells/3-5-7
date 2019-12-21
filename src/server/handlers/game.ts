import { io } from 'fullstack-system';
import { error } from 'log-type';

import { GameSocket, rooms } from '..';
import { RowIndex, MarkArray } from '../../shared/types';

export default function(socket: GameSocket) {
  socket.on('clickMark', (turn: number, row: RowIndex, index: number) => {
    if(rooms[socket.roomCode].turn !== turn) {
      error('Turns do not match. This should never happen.');
      return;
    }

    // TODO: Triple check if we can even make our turn.

    // If we already marked this mark during this turn.
    if(rooms[socket.roomCode].marks[row][index].isSelected) {
      return;
    }
    // If this mark is already marked in this game.
    if(rooms[socket.roomCode].marks[row][index].isMarked) {
      return;
    }

    // Check if we have marked a mark this turn.
    if(rooms[socket.roomCode].activeRow === null) {
      rooms[socket.roomCode].activeRow = row;
    }else {
      if(rooms[socket.roomCode].activeRow !== row) {
        return;
      }
    }

    const newMarks = [ ...rooms[socket.roomCode].marks ] as MarkArray;

    newMarks[row][index].isSelected = true;
    rooms[socket.roomCode].marks = newMarks;

    io.sockets.to(socket.roomCode).emit('updatedRoomData', rooms[socket.roomCode]);
  });
  socket.on('endTurn', (turn: number) => {
    // TODO: Triple check if we can even make our turn.
    if(rooms[socket.roomCode].turn !== turn) {
      error('Turns do not match. This should never happen.');
      return;
    }

    // TODO: Triple check if we can even end our turn.

    // Check if we can even.
    if(!rooms[socket.roomCode].marks.flat().map((mark) => {
      return mark.isSelected;
    }).includes(true)) {
      error('Cannot end a turn if nothing was marked.');
      return;
    }

    // Change our marks to marked marks.
    const newMarks = [ ...rooms[socket.roomCode].marks ] as MarkArray;
    newMarks.forEach((markRow) => {
      markRow.forEach((mark) => {
        if(mark.isSelected) {
          mark.isSelected = false;
          mark.isMarked = true;
        }
      });
    });
    rooms[socket.roomCode].marks = newMarks;

    // If we won.
    if(!rooms[socket.roomCode].marks.flat().map((mark) => {
      return mark.isMarked;
    }).includes(false)) {
      const winningPlayerIndex = 1 - rooms[socket.roomCode].turn;

      rooms[socket.roomCode].winner = winningPlayerIndex;
    }else {
      // Change the turn;
      rooms[socket.roomCode].turn = 1 - rooms[socket.roomCode].turn;
    }

    // Reset some values.
    rooms[socket.roomCode].activeRow = null as any;

    io.sockets.to(socket.roomCode).emit('updatedRoomData', rooms[socket.roomCode]);
  });
  socket.on('rematchRequest', () => {
    // If we have already voted for a rematch.
    if(rooms[socket.roomCode].rematchVotes.includes(socket.username)) {
      return;
    }

    rooms[socket.roomCode].rematchVotes.push(socket.username);

    // Check if we have enough votes to rematch.
    if(rooms[socket.roomCode].rematchVotes.length === 2) {
      // Reset the room.
      rooms[socket.roomCode] = {
        ...rooms[socket.roomCode],
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
        winner: null as any,
        rematchVotes: []
      };
    }

    io.sockets.to(socket.roomCode).emit('updatedRoomData', rooms[socket.roomCode]);
  });
}
