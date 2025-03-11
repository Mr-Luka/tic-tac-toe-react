import {useState, useRef} from 'react';

export default function Player({name}){
    const playerName = useRef(name)
    const [isEditing, setIsEditing] = useState(false);

    function handleClick(){
        setIsEditing(isEditing => !isEditing);

        if(isEditing){
            playerName.current = playerName.current.value;
        }
    }

    let editableName = <span className="player-name">{playerName.current}</span>
    if(isEditing){
        editableName = <input type='text' required ref={playerName} defaultValue={playerName.current} />
    }


    return <li>
            <span className="player">
            {editableName}
            <span className="player-symbol">X</span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
           </li>
}