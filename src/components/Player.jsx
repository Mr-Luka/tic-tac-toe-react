import {useState} from 'react';


export default function Player({initialName, symbol}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleChange (){
        setIsEditing(isEditing => !isEditing);
    }

    function handleInput(e){
        setPlayerName(e.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    if(isEditing){
        editablePlayerName = <input type="text" value={playerName} required onChange={handleInput}/>
    }


    return (
        <li>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleChange}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}