export default function GameOver({winner, onClick}){
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <h1>You won!</h1>}
        {!winner && <h1>Its a draw!</h1>}
        <button onClick={onClick}>Rematch!</button>
    </div>
}