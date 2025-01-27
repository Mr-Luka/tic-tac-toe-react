

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]
// making the board

export default function GameBoard ({ onSelectSquare}){
//     const [ gameBoard, setGameBoard ] = useState(initialGameBoard);// here we set the initialGameBoard as a initial state a.k.a. gameBoard

//     function handleSelectSquare(rowIndex, colIndex){
//         setGameBoard((prevGameBoard)=> { // function form of updating the state by passing a function to the state updating function by passing a function to the state updating function, we will put our prevGameBoard as an argument here passed in automatically by React
//             const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; // updating the state in an immutable way
// //  technically a new array object in memory that contains the old array elements as child elements
//             updatedBoard[rowIndex][colIndex] = activePlayerSymbol; 
//             return updatedBoard;
//         } )

//         onSelectSquare();
//     }


    return <ol id="game-board">
        {gameBoard.map((row, rowIndex)=> <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex)=> 
                (<li key={colIndex}>
                <button onClick={onSelectSquare}>{playerSymbol}</button></li> ))}
            </ol>
        </li>)}
    </ol>
}