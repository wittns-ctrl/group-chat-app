import moment from "moment"

export const msgFormat = (username,message)=>{
    return {
        username,
        message,
        time: moment().format("h:mm a")
    }
}

export default msgFormat