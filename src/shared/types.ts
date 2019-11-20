export interface Mark {
  isMarked: boolean;
}
export interface Game {
  roomCode: string;
  players: string[];
  turn: number;
  gameData: Mark[][];
}
