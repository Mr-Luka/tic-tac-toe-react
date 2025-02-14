import {useState} from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurn, setGameTurn] = useState([]);

  function handleSelectSquare (rowIndex, colIndex){
    setActivePlayer( curActivePlayer => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurn (prevTurns => 
      {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === 'X'){
        currentPlayer = "O"
      }
      
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns];
      return updatedTurns;
      })
  }


  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className='highlight-player'> 
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
           />
           <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
           />
        </ol>
          <GameBoard 
               onSelectSquare={handleSelectSquare}
              turns={gameTurn}

          />
      </div>
        <Log 
          turns={gameTurn}
        />
    </main>
  )
}

export default App
