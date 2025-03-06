import {useState} from 'react';

export default function Player({symbol, playerName, isActive, onChangeName}){
    const [isEditing, setIsEditing] = useState(false)
    const [player, setPlayer] = useState(playerName);

    function handleClik(){
        setIsEditing(isEditing => !isEditing);
        if(isEditing){
            onChangeName(symbol, player);
        }
    }

    function handleName (e){
        setPlayer(e.target.value)
    }

    let editableName = <span className="player-name">{player}</span>;

    if(isEditing){
        editableName = <input required type='text' value={player}  onChange={handleName}/>
    }


    return <li className={isActive ? 'active' : undefined}>
            <span className="player">
            {editableName}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleClik}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
           </li>
}