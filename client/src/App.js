import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import ChatBox from './components/ChatBox'
import HandSelect from './components/HandSelect'
import Timer from './components/Timer'
import Header from './components/Header'
import './App.css'


const sock = io.connect("http://localhost:5004")

function App() {
  const [socket,setSocket] = useState(sock)
  const [selection,setSelection] = useState(null)
  const [serverClock,setServerClock] = useState(null)

  return (
    <div className="App">
      <Header socket={socket}/>
      <main className="main">
        <Timer systemClock={serverClock}/>
        <ChatBox socket={socket} hand={selection} setHand={setSelection} serverClock={serverClock} setServerClock={setServerClock}/>
        <HandSelect hand={selection} setHand={setSelection} socket={socket}/>
      </main>
    </div>
  );
}

export default App;
