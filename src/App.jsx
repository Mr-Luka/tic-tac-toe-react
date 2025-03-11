import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';

function App() {

  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Player  
            name= 'Player 1'
          />
          <Player 
            name= 'Player 2'
          />
        </ol>
        <GameBoard />
      </div>

    </main>
  )
}

export default App
