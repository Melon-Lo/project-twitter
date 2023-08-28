import axios from 'axios';
const baseURL = 'https://simple-twitter-0827-5fac12a34439.herokuapp.com/api'

export const addFollowing = async (Token,id) => {
    try{
        const {data} = await axios.post(`${baseURL}/followships`, {id}, { headers: { Authorization: `Bearer ${Token}` }})
        return data
    }catch(err){
        console.log(err.response.data.message)
    }
}

export const removeFollowing = async (Token,id) => {
    try{
        const {data} = await axios.delete(`${baseURL}/followships/${id}`, { headers: { Authorization: `Bearer ${Token}` }})
        return data
    }catch(err){
        console.log(err.response.data.message)
    }
}