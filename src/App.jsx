import {useState} from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
}

const INITIAL_BOARD_GAME = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function deriveActivePlayer (gameTurn) {
  let currentPlayer = 'X';
      if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
        currentPlayer = 'O';
      }
  return currentPlayer;
}

function deriveBoardGame(gameTurn){
  let gameBoard = [...INITIAL_BOARD_GAME.map(innerArray => [...innerArray])];

   for (const turn of gameTurn) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
   }
   return gameBoard;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  
  const gameBoard = deriveBoardGame(gameTurn)
  const activePlayer = deriveActivePlayer(gameTurn);

  function handleSquareSelect (rowIndex, colIndex){
    setGameTurn (prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurn = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns]
      return updatedTurn;
    })
  }

  return (
    <main>
        <Header /> 
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Player 
            playerName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
           
          />
          <Player 
            playerName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}

          />
        </ol>
        <GameBoard 
          selectSquare={handleSquareSelect}
          board={gameBoard}

        />
      </div>
      <Log 
        turns={gameTurn}
      />
    </main>
  )
}

export default App
