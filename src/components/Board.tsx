import type { Board as BoardType } from '../lib/types';
import './Board.css';

type Props = {
  board: BoardType;
  validMoves: { row: number; col: number }[];
  onMove: (r: number, c: number) => void;
};

function Board({ board, validMoves, onMove }: Props) {
  const validSet = new Set(validMoves.map(m => `${m.row},${m.col}`));
  return (
    <div className="board" role="grid" aria-label="Othello board">
      {board.map((row, r) => (
        <div key={r} className="board-row" role="row">
          {row.map((cell, c) => {
            const isValid = validSet.has(`${r},${c}`);
            return (
              <button
                key={c}
                className={`cell ${isValid ? 'valid' : ''}`}
                onClick={() => isValid && onMove(r, c)}
                aria-label={`row ${r + 1} col ${c + 1}`}
                role="gridcell"
                type="button"
              >
                {cell === 'B' && <div className="disk black" />}
                {cell === 'W' && <div className="disk white" />}
                {cell === null && isValid && <div className="hint" />}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
