import {useState} from 'react';

import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import GameBoard from './components/GameBoard.jsx';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]


function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
    setGameBoard( prevGameBoard => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
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
          board={gameBoard}
          handleClick={handleSelectSquare}
        />
      </div>
    </main>
  )
}

export default App
