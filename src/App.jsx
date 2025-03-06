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

const INITIAL_BOARD_GAME = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveGameBoard(gameTurn){
  let gameBoard = [...INITIAL_BOARD_GAME.map(array => [...array])];

    for(const turn of gameTurn) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
      }
      return gameBoard;
}

function deriveActivePlayer(gameTurn){
  let currentPlayer = 'X';

      if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
        currentPlayer = 'O'
      }
  return currentPlayer
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
  const [gameTurn, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurn);
  const activePlayer = deriveActivePlayer(gameTurn);
  const winner = deriveWinner(gameBoard, player);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSquareClick(rowIndex, colIndex){
    setGameTurns(prevTurn => {
      let currentPlayer = deriveActivePlayer(prevTurn);

      if(prevTurn.length > 0 && prevTurn[0].player === 'X'){
        currentPlayer = 'O'
      }
      const newTurn = [ {square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurn];
      return newTurn;
    })
    }

    function handleReset(){
      setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName){
      setPlayer(prevPlayer => {
        return {
          ...prevPlayer,
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
            symbol='X'
            playerName={PLAYERS.X}
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            symbol='O'
            playerName={PLAYERS.O}
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onClick={handleReset}/>}

        <GameBoard 
          onClick={handleSquareClick}
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
