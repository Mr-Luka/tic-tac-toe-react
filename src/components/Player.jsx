import {useState} from 'react';

export default function Player({name, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(name)
    const [isEditing, setIsEditing] = useState(false);
// function that will handle name change editing button
    function handleClick(){
        setIsEditing(isEditing => !isEditing);

        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(e){
        setPlayerName(e.target.value)
    }

    let editableName = <span className="player-name">{playerName}</span>
    if(isEditing){
        editableName = <input type='text' required  value={playerName} onChange={handleChange}/>
    }


    return <li className={isActive ? 'active' : undefined}>
            <span className="player">
            {editableName}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
           </li>
}