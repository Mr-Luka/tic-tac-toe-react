import {useState} from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './components/winning-combinations.js';
import GameOver from './components/GameOver.jsx';

// constant of the tic tac toe board
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

function derriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=> [...array])];

    for(let turn of gameTurns ){
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
}


function derriveActivePlayer(gameTurns){
  let activePlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      activePlayer = 'O';
  }
  return activePlayer;
}

function derriveWinner (gameBoard, player){
  let winner;

  for (let combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns ] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);


  const activePlayer = derriveActivePlayer(gameTurns);
  const gameBoard = derriveGameBoard(gameTurns);
  const winner = derriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;

    function handleSquareClick(rowIndex, colIndex){

        setGameTurns(prevTurn => {
          const activePlayer = derriveActivePlayer(prevTurn)
          const updatedTurn = [{square: {row: rowIndex, col: colIndex}, player: activePlayer}, ...prevTurn];
          return updatedTurn
        })
    }

    function handleRematch(){
      setGameTurns([])
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
            name= {PLAYERS.X}
            symbol= 'X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            name= {PLAYERS.O}
            symbol = 'O'
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) &&  <GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard 
          squareClick={handleSquareClick}
          board={gameBoard}
        />
      </div>
        <Log 
          turns={gameTurns}
        />
    </main>
  )
}

export default App
