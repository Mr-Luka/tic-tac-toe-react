import logo from './game-logo.png';

// header for the game
export default function Header (){
    return <header>
        <img src={logo} alt="tic-tac-toe logo" />
        <h1> Tic Tac Toe </h1>
    </header>
}