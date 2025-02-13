

import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import GameBoard from './components/GameBoard.jsx';



function App() {


  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players"> 
          <Players
            initialPlayerName='Player 1' 

          />
          <Players
            initialPlayerName='Player 2'
            />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare}
        />
      </div>
    </main>
  )
}

export default App
