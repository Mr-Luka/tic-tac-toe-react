import {useState} from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './components/winning-combinations.js';
import GameOver from './components/GameOver.jsx';





function App() {


  return (
    <main>
        <Header /> 
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Player 
            symbol='X'
            playerName='Player 1'
          />
          <Player 
            symbol='O'
            playerName='Player 1'
          />
        </ol>

        <GameBoard 

        />
      </div>
      <Log 

      />
    </main>
  )
}

export default App
