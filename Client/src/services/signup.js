import axios from 'axios'
const baseURL='api/users'

const signup=async(data)=>{
    const res=await axios.post(baseURL,data)
    return res.data
}

export default {signup}