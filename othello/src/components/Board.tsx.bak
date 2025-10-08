import { useReducer } from 'react';
import { createInitialBoard, getValidMoves, applyMove } from '../lib/othello';
import type { Board, Player } from '../lib/types';

type State = {
  board: Board;
  current: Player;
  validMoves: { row: number; col: number }[];
};

type Action =
  | { type: 'RESET' }
  | { type: 'MOVE'; row: number; col: number };

function init(): State {
  const board = createInitialBoard();
  const current: Player = 'B';
  return { board, current, validMoves: getValidMoves(board, current) };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return init();
    case 'MOVE': {
      const newBoard = applyMove(state.board, action.row, action.col, state.current);
      if (!newBoard) return state;
      const next: Player = state.current === 'B' ? 'W' : 'B';
      const nextValid = getValidMoves(newBoard, next);
      if (nextValid.length > 0) {
        return { board: newBoard, current: next, validMoves: nextValid };
      }
      // 相手に手が無ければパス（元プレイヤーに戻る）かゲーム終了
      const curValid = getValidMoves(newBoard, state.current);
      if (curValid.length > 0) {
        return { board: newBoard, current: state.current, validMoves: curValid };
      }
      // 両者パス => ゲーム終了（validMoves 空）
      return { board: newBoard, current: next, validMoves: [] };
    }
    default:
      return state;
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  return { state, dispatch };
}


