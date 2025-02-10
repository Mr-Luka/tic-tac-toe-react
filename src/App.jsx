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
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

    for (let turn of gameTurns ){
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const activePlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: activePlayer} ,...prevTurns];
      return updatedTurns;
    } )
  }

  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Players
            initialPlayerName='Player 1' 
            symbol="X"
            isActive={activePlayer === 'X'}

          />
          <Players
            initialPlayerName='Player 2'
            symbol="O"
            isActive={activePlayer === 'O'}
            />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log
        turns={gameTurns} />
    </main>
  )
}

export default App
