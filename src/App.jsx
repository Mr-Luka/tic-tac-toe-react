import {useState} from 'react';

import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './components/winning-combinations.js';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer;
}


function App() {


  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Players
            initialPlayerName='Player 1' 

          />
          <Players
            initialPlayerName='Player 2'
            />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
    </main>
  )
}

export default App
