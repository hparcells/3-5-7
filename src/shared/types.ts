/** Indexes of the marks in the first row. */
type Row1Index = 0 | 1 | 2;
/** Indexes of the marks in the second row. */
type Row2Index = 0 | 1 | 2 | 3 | 4;
/** Indexes of the marks in the third row. */
type Row3Index = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** The three rows. */
export type RowIndex = 0 | 1 | 2;
/** Any position of a mark in a row. */
export type MarkRowIndex = Row1Index | Row2Index | Row3Index;
/** The array the contains all the marks. */
export type MarkArray = [Mark[], Mark[], Mark[]];

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
  marks: MarkArray;
  /** The row that the first selected mark was made in. */
  activeRow: RowIndex;
}
