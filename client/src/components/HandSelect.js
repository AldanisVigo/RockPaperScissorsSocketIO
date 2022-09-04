import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock, faHandScissors, faHandPaper } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import './HandSelect.css'

const HandSelect = ({hand,setHand,socket}) => {

    const setHandAndNotifyServer = (selectedHand) => {
        setHand(selectedHand)
        socket.emit('select-hand',selectedHand)
    }

    return <div>
        <h1></h1>
        <div className="hands">
            <FontAwesomeIcon className="hand" color={hand === 'rock' ? 'red' : 'black'} size="8x" icon={faHandRock} onClick={e=>setHandAndNotifyServer('rock')}/>
            <FontAwesomeIcon className="hand" color={hand === 'paper' ? 'red' : 'black'} size="8x" icon={faHandPaper} onClick={e=>setHandAndNotifyServer('paper')}/>
            <FontAwesomeIcon className="hand" color={hand === 'scissors' ? 'red' : 'black'} size="8x" icon={faHandScissors} onClick={e=>setHandAndNotifyServer('scissors')}/>
        </div>
    </div>
}

export default HandSelect