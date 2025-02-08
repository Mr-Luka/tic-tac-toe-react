import logo from '../../public/game-logo.png'

export default function Header () {
    return <header>
        <img src={logo} alt="handrawn tik tak toe"/>
        <h1>Tik-Tak-Toe</h1>
    </header>
}