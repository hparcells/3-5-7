export interface Mark {
  /** Whether or not this mark has been marked. */
  isMarked: boolean;
  /** Whether or now this mark has been selected during the current turn. */
  isSelected: boolean;
}
export interface Game {
  /** The room code of the game. "LOCAL" if it is a local game. */
  roomCode: string;
  /** An array of the usernames of the platers in the game. */
  players: string[];
  /** The index of whos turn it is. Points to `players`. */
  turn: number;
  /** An array of arrays of the marks in the game. */
  marks: Mark[][];
}
