import {useState} from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './components/winning-combinations.js';
import GameOver from './components/GameOver.jsx';

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

function deriveWinner (gameBoard, players) {
  let winner;

  for (let combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol]
    }
  }
  return winner;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  
  const gameBoard = deriveBoardGame(gameTurn)
  const activePlayer = deriveActivePlayer(gameTurn);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurn.length === 9 && !winner;


  function handleSquareSelect (rowIndex, colIndex){
    setGameTurn (prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurn = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns]
      return updatedTurn;
    })
  }

  function handleRematch(){
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
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
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            playerName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}

          />
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRematch} winner={winner}/>}
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
