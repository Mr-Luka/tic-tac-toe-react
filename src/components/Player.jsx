import {useState} from 'react';

export default function Player({playerName, symbol, isActive, onChangeName}){
    const [isEditing, setIsEditing] = useState(false);
    const [player, setPlayer] = useState(playerName)

    function handleChange (){
        setIsEditing(isEditing => !isEditing);
        if(isEditing){
            onChangeName(symbol, player);
        }
    }

    function handlePlayerName(e){
        setPlayer(e.target.value)
    }

    let editablePlayerName = <span className="player-name">{player}</span>
    if(isEditing){
        editablePlayerName = <input type="text" value={player} required onChange={handlePlayerName}/>
    }


    return <li className={isActive ? 'active' : undefined}>
    <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleChange}>{isEditing ? 'Save' : 'Edit'}</button>
    </span>
    </li>
}