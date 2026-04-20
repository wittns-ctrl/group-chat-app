const chat = document.getElementById("chat-form")

const socket =  io()
socket.on("message",(message)=>{

chat.addEventListener("submit",(e)=>{
    e.preventDefault()
// get message text
const input = document.getElementById("msg")
// Emitting message to server
if(input.value){
    socket.emit("chatmessage",input.value)
}
})

})