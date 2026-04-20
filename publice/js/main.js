const chat = document.getElementById("chat-form")
const chatmessaging = document.querySelector(".chat-messages")

const socket =  io()
socket.on("message",(message)=>{
    // displaying chat messages
displaymessage(message)

// message scrolling behaviour
chatmessaging.scrollTop = chatmessaging.scrollHeight

chat.addEventListener("submit",(e)=>{
    e.preventDefault()
// get message text
const input = document.getElementById("msg")
// Emitting message to server
if(input.value){
    socket.emit("chatmessage",input.value)
    
    input.value = ""
}
})

})

//messaeg display function

function displaymessage(message){

    const div = document.createElement('div')
    div.classList.add("message")
    div.innerHTML = `
    <p class="meta">Brad <span>9:12pm</span></p>
						<p class="text">
						 ${message}
						</p>
    `
    document.querySelector(".chat-messages").appendChild(div)
    }