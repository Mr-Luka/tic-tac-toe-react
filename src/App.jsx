import {useState} from 'react';
import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import GameBoard from './components/GameBoard.jsx';

// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ]

// function deriveActivePlayer(gameTruns){
//   let activePlayer = 'X';
//   if( gameTruns.length === 'X') {
//     return activePlayer = 'O';
//   }
// }


function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  // const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

  function handleSelectSquare(){
    setActivePlayer (curActivePlayer => curActivePlayer === "X" ? "O" : 'X');
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
          activePlayerSymbol={activePlayer}
        />
      </div>
    </main>
  )
}

export default App
