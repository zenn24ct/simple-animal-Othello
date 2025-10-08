import React from 'react';
// import { Board } from './components/Board';
import Board from './components/Board';
import { useGame } from './hooks/useGame';
import { countPieces } from './lib/othello';
import './App.css';

function App() {
  const { state, dispatch } = useGame();
  const { board, current, validMoves } = state;
  const score = countPieces(board);

  return (
    <div className="app" style={{ padding: 20 }}>
      <h1>Othello</h1>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div>
          <Board
            board={board}
            validMoves={validMoves}
            onMove={(r, c) => dispatch({ type: 'MOVE', row: r, col: c })}
          />
        </div>

        <aside style={{ minWidth: 160 }}>
          <p><strong>Current:</strong> {current}</p>
          <p><strong>Black:</strong> {score.B}</p>
          <p><strong>White:</strong> {score.W}</p>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
          </div>

          <div style={{ marginTop: 12 }}>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
              Hint: click a highlighted cell to place a disk.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
