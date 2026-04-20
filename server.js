import dotenv from "dotenv"
dotenv.config()
import {fileURLToPath} from "url"
import path from "path"
import http from "http"
import express from "express"
import {Server} from "socket.io"
import msgFormat from "./utils/message.js"
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname,"publice")))

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const chatbot = "ChartCod bot"

const io = new Server(server);
io.on("connection",(socket)=>{
    // welcome message
    socket.emit("message",msgFormat(chatbot,"Welcome on ChartCord!"))

    // when a new user connects
    socket.broadcast.emit("message",msgFormat(chatbot,"A new user has joined the chart"))
 // listen for chat message
    socket.on("chatmessage",(msg)=>{
    io.emit("message",msgFormat("USER",msg))
    })

    //when a user disconnects 
     socket.on("disconnect",()=>{
      io.emit("message",msgFormat(chatbot,"user left chartCord"))
            })  
})

server.listen(PORT,()=>{
    console.log(`server running on PORT:${PORT}`)
})