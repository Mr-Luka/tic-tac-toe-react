
export default function GameBoard ({ onSelectSquare, board }){
 return <ol id="game-board">
        {board.map((row, rowIndex)=> <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex)=> 
                (<li key={colIndex}>
                <button 
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null}
                >
                    {playerSymbol}
                </button></li> ))}
            </ol>
        </li>)}
    </ol>
}

// gameBoard function where we are destructuring onSelectSquare and board,
// we are returning an ordered list with id of game-board
// inside the list we are mapping over the board array
// for each row we are returning a list item with a key of the row index
// inside the list item we are mapping over the row array
// for each player symbol we are returning a list item with a key of the column index
// inside the list item we are returning a button with an onClick event
// that calls the onSelectSquare function with the row and column index
// the button is disabled if the player symbol is not null
// we are also displaying the player symbol inside the button
