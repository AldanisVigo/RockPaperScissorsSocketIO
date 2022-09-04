import { useRef, useState, useEffect } from 'react'
import Message from './Message'
import './ChatBox.css'
const ChatBox = ({socket,hand,setHand,serverClock,setServerClock}) => {
    const [messages,setMessages] = useState([])
    const messageRef = useRef()
    const incomingContainer = useRef()
    const [currentHand,setCurrentHand] = useState(null)
    // const [previousHands,setPreviousHands] = useState(null)

    const addMessage = (msg) => {
        let newMessages = [...messages,msg]
        console.log("Adding system message")
        console.log(newMessages)
        setMessages([
            ...messages,
            msg
        ])
    }

    const checkForEnter = (e) => {
        if(e.key === 'Enter'){
            sendMessage(socket)
            messageRef.current.value = ''
        }
    }

    const sendMessage = (sock) => {
        const newMessage = {
            content: messageRef.current.value,
            timestamp : (new Date()).toString(),
            senderId : sock.id,
            type : 'out'
        }
        setMessages([...messages,newMessage])

        socket.emit('send-message',newMessage)
        //Scroll to the last message
        // incomingContainer.current.scrollTop = incomingContainer.current.scrollHeight

        //Clear the message input
        // messageRef.current.value = ''
        messageRef.current.focus()
    }


    useEffect(()=>{
        socket?.on('clock-update',data=>{
            setServerClock(data.timeLeft)
            if(currentHand != data.hand){
                addMessage({
                    content: `We are entering the ${data.hand} hand`,
                    timestamp : (new Date()).toString(),
                    senderId : 'SYSTEM',
                    type : 'system'
                })
                setCurrentHand(data.hand)
                // setHand(null)
            }
        })

        const charHands = {
            rock : '🪨',
            paper : '📃',
            scissors: '✂️'
        }

        socket?.on('score',data=>{
            console.log("Score:") 
            console.log(data)
            let msg = 'HAND REVEAL:\n'
            Object.keys(data.hands).forEach(key=>{
                msg += `${key} : ${charHands[data.hands[key]]}\n`
            })

            if(Object.keys(data.hands).length > 0){
                addMessage({
                    content : msg,
                    timestamp : (new Date()).toString(),
                    senderId: 'SYSTEM',
                    type: 'system'
                })
            }
            // setPreviousHands(data)
        })

        socket?.on('message',data=>{
            data.type = 'in'
            // console.log("INCOMING MESSAGE")
            // console.log(data)
            addMessage(data)
        })

        return ()=>{
            socket?.off('clock-update')
            socket?.off('score')
        }
    },[addMessage,setCurrentHand,setHand,setServerClock])

    return <div className="chatbox">
        <div className="incoming" ref={incomingContainer}>
            {messages && messages.map((message,index) => {
                const { content, timestamp, senderId, type } = message
                return <Message key={index} content={content} timestamp={timestamp} senderId={senderId} type={type}/>
            })}
        </div>
        <div className="outgoing">
            <textarea ref={messageRef} onKeyUp={checkForEnter} rows="4" placeholder="Message"></textarea>
            <button onClick={()=>sendMessage(socket)}>Send</button>
        </div>
    </div>
}

export default ChatBox