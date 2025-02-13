import {useState} from 'react';

export default function Players({initialPlayerName, isActive }){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialPlayerName)

    function handleEditing (){
        setIsEditing(prevEditing => !prevEditing);

    }
    function handleNameChange (e){
        setPlayerName(e.target.value)
    }

    
    let player = <span className="player-name">{playerName}</span>
    if (isEditing){
        player = <input type="text" value={playerName} onChange={handleNameChange} required/>
    }

    return (
            <li className={isActive ? 'active' : null}>
                <span className='player'>
                    {player}
                    <span className='player-symbol'>X</span>
                </span>
                <button onClick={handleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
            </li>
    )
}