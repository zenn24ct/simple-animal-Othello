import type { Board, Cell, Player } from './types';

export const SIZE = 8;
const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1],  [1, 0], [1, 1]
];

export function createEmptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array<Cell>(SIZE).fill(null));
}

export function createInitialBoard(): Board {
  const b = createEmptyBoard();
  b[3][3] = 'W';
  b[3][4] = 'B';
  b[4][3] = 'B';
  b[4][4] = 'W';
  return b;
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function opponent(p: Player): Player {
  return p === 'B' ? 'W' : 'B';
}

function flipsInDirection(board: Board, row: number, col: number, dr: number, dc: number, player: Player): [number, number][] {
  const res: [number, number][] = [];
  let r = row + dr;
  let c = col + dc;
  while (inBounds(r, c)) {
    const cur = board[r][c];
    if (cur === opponent(player)) {
      res.push([r, c]);
    } else if (cur === player) {
      return res.length > 0 ? res : [];
    } else {
      return [];
    }
    r += dr; c += dc;
  }
  return [];
}

export function isValidMove(board: Board, row: number, col: number, player: Player): boolean {
  if (board[row][col] !== null) return false;
  for (const [dr, dc] of DIRECTIONS) {
    if (flipsInDirection(board, row, col, dr, dc, player).length > 0) return true;
  }
  return false;
}

export function getValidMoves(board: Board, player: Player) {
  const moves: { row: number; col: number }[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (isValidMove(board, r, c, player)) moves.push({ row: r, col: c });
    }
  }
  return moves;
}

export function applyMove(board: Board, row: number, col: number, player: Player): Board | null {
  if (!isValidMove(board, row, col, player)) return null;
  const newBoard = board.map(r => r.slice()) as Board;
  const toFlip: [number, number][] = [];
  for (const [dr, dc] of DIRECTIONS) {
    const flips = flipsInDirection(newBoard, row, col, dr, dc, player);
    toFlip.push(...flips);
  }
  newBoard[row][col] = player;
  for (const [r, c] of toFlip) newBoard[r][c] = player;
  return newBoard;
}

export function countPieces(board: Board) {
  let b = 0, w = 0;
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
    if (board[r][c] === 'B') b++;
    if (board[r][c] === 'W') w++;
  }
  return { B: b, W: w };
}
