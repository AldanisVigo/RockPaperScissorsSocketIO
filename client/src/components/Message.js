import './Message.css'
import { useEffect, useRef, useState } from 'react'
const Message = ({content,timestamp,senderId,type}) => {
    const [inView,setInView] = useState(false)
    const messageRef = useRef()
    useEffect(()=>{
        if(!inView){
            messageRef.current.scrollIntoView()
            setInView(true)
        }
    })

    return <div className={type === 'out' ? 'message out' : type === 'system' ? 'message system' : 'message in'} ref={messageRef}>
        <div className="message-content-container">
            <span className={senderId === 'SYSTEM' ? 'message-sender-id sysid' : 'message-sender-id'}>{senderId}</span> - <span className="message-content">{content}</span>
        </div>
        <div className="message-timestamp-container">
            <span className="message-timestamp">{timestamp}</span>
        </div>
    </div>
}

export default Message