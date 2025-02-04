import {useState} from 'react';
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


// Function that will loop through the combinations of winning combinations, and for creates the frist, second and third square symbol,
// in an constant that equals to the gameBoard's combination row and column, and then we are setting the if statement, 
// to check if the first, second and third square symbol are the same, and if they are
// then we are returning true, otherwise we are returning false
function deriveWinner(gameBoard, players){
  let winner = null;

    for (const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
      }
    }
    return winner;
}

// function that will check if the length of gameTurns is 0 and if its the "first" turn which it will always be
// and then we are returning the first player, otherwise we are returning the second player
function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_BOARD_GAME.map(array=> [...array])]; // because we have nested arrays, we are mapping throught
// initialBoardGame and everything from inside that array.

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState( [] );


  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner; // we have a draw, no winner

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns ((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer} ,...prevTurns];
// we are getting a square that ras a row and row index and a column with column index, and besure that square we have a player
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers((previPlayers)=>{
      return {
        ...previPlayers,
        [symbol]: newName
      }
    } )
  }

  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
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
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
