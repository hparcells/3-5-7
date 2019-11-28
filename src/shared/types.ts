export interface Mark {
  isMarked: boolean;
  isSelected: boolean;
}
export interface Game {
  roomCode: string;
  players: string[];
  turn: number;
  marks: Mark[][];
}
