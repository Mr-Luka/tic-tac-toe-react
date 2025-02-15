import Header from './components/Header.jsx';
import Player from './components/Player.jsx';

function App() {


  return (
    <main>
        <Header /> 
      <div id="game-container">
        <ol id="players"> 
          <Player 
            playerName='Player 1'
            symbol="X"
          />
          <Player 
            playerName='Player 2'
            symbol="O"

          />
        </ol>

      </div>

    </main>
  )
}

export default App
