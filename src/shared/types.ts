export interface Mark {
  isMarked: boolean;
}
export interface Room {
  roomCode: string;
  players: string[];
  turn: number;
  gameData: Mark[][];
}
