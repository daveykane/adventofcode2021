export type Bingo = {
  numbers: number[];
  boards: Boards;
};

export type Boards = Array<Board>;

export type Board = Array<Line>;

export type Line = Array<LineNumber>;

export type LineNumber = {
  number: number;
  marked: boolean;
};
