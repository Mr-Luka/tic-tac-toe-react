import {useState} from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './components/winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function deriveWinner (gameBoard, player) {
  let winner = null;
  for (let combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveActivePlayer (gameTurn){
  let currentPlayer = "X";
      if (gameTurn.length > 0 && gameTurn[0].player === 'X'){
        currentPlayer = "O"
      }
    return currentPlayer
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=> [...array])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  
  const activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare (rowIndex, colIndex){
    setGameTurn (prevTurns => 
      {
        const activePlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer},...prevTurns];
      return updatedTurns;
      })
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers((previPlayers)=>{
      return {
        ...previPlayers,
        [symbol]: newName
      }
    } )
  }

  function handleRematch (){
    setGameTurn([])
  }

  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className='highlight-player'> 
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
           />
           <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
           />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
          <GameBoard 
              onSelectSquare={handleSelectSquare}
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
