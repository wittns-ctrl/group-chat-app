const users = []

export const  JoinRoom = (id,username,room)=>{
       const user = {id,username,room}

       users.push(user)
       return user
}

export const finduser = (id)=>{
    return users.find(user => user.id === id)
}