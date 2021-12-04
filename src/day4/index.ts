import { Boards, Board, Line } from "./types.ts";

const check = (board: Board, length: number, position: number, direction: string): boolean => {
  let markedCount = 0;
  let winner = false;

  for (let i = 0; i < length; i += 1) {
    const lineNumber = direction === "column" ? board[i][position] : board[position][i];
    if (lineNumber.marked) markedCount += 1;
  }

  if (markedCount === length) winner = true;
  return winner;
};

const markAndCheck = (board: Board, number: number): boolean | undefined => {
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      if (board[y][x].number === number) {
        board[y][x].marked = true;

        if (check(board, board.length, x, "column") || check(board, board[0].length, y, "row")) {
          return true;
        }
      }
    }
  }
};

const getScore = (board: Board, drawnNumber: number): number => {
  const unmarkedSum = board.reduce((total: number, line: Line) => {
    return total + line.reduce((lineTotal, { marked, number }) => (!marked ? lineTotal + number : lineTotal), 0);
  }, 0);

  return unmarkedSum * drawnNumber;
};

const getBoardAndLastNumber = (numbers: number[], boards: Boards, matchOn: number) => {
  const winningBoardsIndex: number[] = [];

  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = 0; j < boards.length; j += 1) {
      if (markAndCheck(boards[j], numbers[i])) {
        if (!winningBoardsIndex.includes(j)) winningBoardsIndex.push(j);
        if (winningBoardsIndex.length == matchOn) return getScore(boards[j], numbers[i]);
      }
    }
  }
};

export const part1 = (numbers: number[], boards: Boards) => getBoardAndLastNumber(numbers, boards, 1);
export const part2 = (numbers: number[], boards: Boards) => getBoardAndLastNumber(numbers, boards, boards.length);
