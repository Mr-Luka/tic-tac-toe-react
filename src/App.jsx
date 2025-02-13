import {useState} from 'react';

import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';

// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ]



function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currentPlayer = 'X'

      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
        currentPlayer = 'O'
      }

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer },...prevTurns];

      return updatedTurns
    })
    
  }


  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Players
            initialPlayerName='Player 1'
            isActive={activePlayer === 'X'}


          />
          <Players
            initialPlayerName='Player 2'
            isActive={activePlayer === 'O'}
            />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}

        />
      </div>
      <Log />
    </main>
  )
}

export default App
