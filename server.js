import dotenv from "dotenv"
dotenv.config()
import {fileURLToPath} from "url"
import path from "path"
import http from "http"
import express from "express"
import {Server} from "socket.io"
import msgFormat from "./utils/message.js"
import {JoinRoom,finduser,userLeave,roommates} from "./utils/user.js"
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname,"publice")))

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const chatbot = "ChartCord bot"

const io = new Server(server);
io.on("connection",(socket)=>{
       socket.on("joinMessage",({username,room})=>{
       const user = JoinRoom(socket.id,username,room)
        socket.join(user.room)
            // welcome message
    socket.emit("message",msgFormat(chatbot,"Welcome on ChartCord!"))

    // when a new user connects
    socket.broadcast.to(user.room).emit("message",msgFormat(chatbot,`${user.username} has joined the chart`))

    io.to(user.room).emit("roomMsg",{
        room:user.room,
        users:roommates(user.room)
    })

    })

 // listen for chat message
    socket.on("chatmessage",(msg)=>{

        const user = finduser(socket.id)

    io.to(user.room).emit("message",msgFormat(user.username,msg))
    })
 

    //when a user disconnects 
     socket.on("disconnect",()=>{
        const user = userLeave(socket.id)
        if (user){
      io.to(user.room).emit("message",msgFormat(chatbot,`${user.username} left chartCord`))

    io.to(user.room).emit("roomMsg",{
        room:user.room,
        users:roommates(user.room)
    })

        }
            })  
})

server.listen(PORT,()=>{
    console.log(`server running on PORT:${PORT}`)
})