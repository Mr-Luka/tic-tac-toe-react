export default function GameOver({winner}){
    return <div id="game-ver">
        <h2>Game Over!</h2>
        <p>{winner} won!</p>
        <p><button>Rematch!</button></p>
    </div>
}