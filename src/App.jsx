import {useState} from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './components/winning-combinations.js';
import GameOver from './components/GameOver.jsx';


const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


function App() {
  const [gameTurn, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSquareClick(rowIndex, colIndex){
    setActivePlayer(curActivePlayer => curActivePlayer === 'X' ? 'O' : 'X')
    
    setGameTurns(prevTurn => {
      let currentPlayer = 'X';

      if(prevTurn.length > 0 && prevTurn[0].player === 'X'){
        currentPlayer = 'O'
      }
      const newTurn = [ {square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurn];
      return newTurn;
    })
    }


  return (
    <main>
        <Header /> 
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Player 
            symbol='X'
            playerName='Player 1'
            isActive={activePlayer === 'X'}
          />
          <Player 
            symbol='O'
            playerName='Player 2'
            isActive={activePlayer === 'O'}
          />
        </ol>

        <GameBoard 
          turns={gameTurn}
          onClick={handleSquareClick}

        />
      </div>
      <Log 
        turns={gameTurn}
      />
    </main>
  )
}

export default App
