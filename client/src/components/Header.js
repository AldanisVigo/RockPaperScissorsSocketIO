import './Header.css'
const Header = ({socket}) => {
    return <header className="header">
        <span className="paper">Vigo's - </span>
        <span className="rock">Rock</span>
        <span className="paper">Paper</span>
        <span className="scissors">Scissors</span>
    </header>
}

export default Header