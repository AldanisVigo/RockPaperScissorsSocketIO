import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import compression from "compression"
const app = express();
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

app.use(cors())
app.use(compression());
app.use(express.static("build"))

const server = createServer(app)

server.listen(5004,()=>{
    console.log("Socket IO running on port 5004")
})

const io = new Server(server, {
    cors : {
        origin : 'http://localhost:3000',
        methods : ['GET','POST','PUT','DELETE','PATCH']
    }
})

let currentSecond = 0;
const handTime = 30;
let handCount = 0;
// console.log(socket)
const hands = new Map();
const socket = null;
setInterval(()=>{
    if(currentSecond === handTime){
        currentSecond = 0;
        handCount++;
        //New hand now
        if(io.sockets){
            io.sockets.emit('score',{hands})
        }
        
    }else{
        currentSecond++;
    }

    if(io.sockets){
        io.sockets.emit('clock-update',{
            hand : handCount,
            timeLeft : handTime - currentSecond
        })
    }
},1000)
io.on('connection',socket=>{
    
    socket.on('select-hand',data=>{
        hands[socket.id] = data
        console.log(socket.id + " has selected " + data)
        // socket.broadcast.emit('hands-update',hands)
    })

    socket.on('send-message',data=>{
        console.log(`${socket.id} sending message:`)
        console.log(data)
        socket.broadcast.emit('message',data)
    })

    socket.on('disconnect', () => {
        console.log("User disconnected from socket :" + socket.id)
        delete hands[socket.id]
    })
    
})



app.listen(process.env.PORT, ()=>{
  console.info(`Running server on localhost:${process.env.PORT}...`)
});

