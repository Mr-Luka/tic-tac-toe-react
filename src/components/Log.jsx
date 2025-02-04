export default function Log({turns}){
    return <ol id="log">
            {turns.map(turn => (
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row}, {turn.square.col}
                </li>
                ))}
           </ol>
}
/*
Log component that will map through turns and for every turn it will generate a listed item, 
and each listed item will generate name of the player by pulling the data from the parent component, 
the square that the player selected by pulling the data from the parent component for the row and column.
App() - lifting the computed value up.

we destructured turns as a parameter, because we are gonna use the same data in the App()


*/