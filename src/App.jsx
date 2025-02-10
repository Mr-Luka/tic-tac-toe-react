import {useState} from 'react';
import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';


// function deriveActivePlayer(gameTruns){
//   let activePlayer = 'X';
//   if( gameTruns.length === 'X') {
//     return activePlayer = 'O';
//   }
// }


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X')
  // const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex){
    setActivePlayer (curActivePlayer => curActivePlayer === "X" ? "O" : 'X');
    setGameTurns(prevTurns => {
      let currentPlater = 'X';

      if(prevTurns.length > 0 && prevTurns[0] === 'X'){
        currentPlater = 'O';
      }
      const updatedTurns = [ {square: {row: rowIndex, col: colIndex}, player: currentPlater}, ...[prevTurns]];

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
          turns={gameTurns}
        />
      </div>
      <Log
        turns={gameTurns} />
    </main>
  )
}

export default App
