
const chat = document.getElementById("chat-form")
const chatmessaging = document.querySelector(".chat-messages")
const roomnames = document.getElementById("room-name")
const usernames = document.getElementById("users")

// get username and room form the URL
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})


const socket =  io()

//join room

socket.emit("joinMessage",{username,room})


// room information
socket.on("roomMsg",({room,users})=>{
    outputRoom(room)
    outputUsers(users)
})

// listening to server messages
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

function displaymessage(messages){

    const div = document.createElement('div')
    div.classList.add("message")
    div.innerHTML = `
    <p class="meta">${messages.username} <span>${messages.time}</span></p>
						<p class="text">
						 ${messages.message}
						</p>
    `
    document.querySelector(".chat-messages").appendChild(div)
    } 

    // room function

    function outputRoom(room){
        roomnames.innerHTML = room
    }

    function outputUsers(users){
      usernames.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
    }