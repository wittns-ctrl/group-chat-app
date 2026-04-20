import dotenv from "dotenv"
dotenv.config()
import {fileURLToPath} from "url"
import path from "path"
import http from "http"
import express from "express"
import {Server} from "socket.io"
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname,"publice")))

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

const io = new Server(server);
io.on("connection",(socket)=>{
    // welcome message
    socket.emit("message","Welcome on ChartCord!")

    // when a new user connects
    socket.broadcast.emit("message","A new user has joined the chart")

    //when a user disconnects 
     socket.on("disconnect",()=>{
      io.emit("message","user left chartCord")
            })  
})

server.listen(PORT,()=>{
    console.log(`server running on PORT:${PORT}`)
})