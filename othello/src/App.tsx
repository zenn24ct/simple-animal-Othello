import React from 'react';
import Board from './components/Board';
import { useGame } from './hooks/useGame';
import { countPieces } from './lib/othello';
import './App.css';

function App() {
  const { state, dispatch } = useGame();
  const { board, current, validMoves } = state;
  const score = countPieces(board);

  return (
    <div className="app">
      <h1>Othello</h1>
      <div style={{display:'flex', gap:20, alignItems:'flex-start'}}>
        <div>
          <Board board={board} validMoves={validMoves} onMove={(r,c)=>dispatch({type:'MOVE', row:r, col:c})} />
        </div>
        <div>
          <p>Current: {current}</p>
          <p>Black: {score.B}</p>
          <p>White: {score.W}</p>
          <button onClick={()=>dispatch({type:'RESET'})}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
