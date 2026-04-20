const users = []

//user join room
export const  JoinRoom = (id,username,room)=>{
       const user = {id,username,room}

       users.push(user)
       return user
}

// get current user
export const finduser = (id)=>{
    return users.find(user => user.id === id)
}

// user leave chart

export const userLeave = (id)=>{
const index = users.find(user => user.id === id)

if(index !== -1){
    return users.splice(index,1)[0]
}
}

//find roommembers

export const roommates = (room)=>{
    const user = users.filter(user => user.room === room)

    return user
}