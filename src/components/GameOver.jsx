export default function GameOver({winner, onRestart}){
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's a draw!</p>}
        <p><button onClick={onRestart}>Rematch!</button></p>
    </div>
}

// Game over component that will pop out when the game has ended, weather there is a winner
// or a draw. The component will display the winner and a button to restart the game.