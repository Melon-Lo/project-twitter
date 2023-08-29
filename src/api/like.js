import axios from "axios";
const baseURL = 'https://simple-twitter-0827-5fac12a34439.herokuapp.com/api'

export const addLike = async (Token, id) => {
    try {
        const { data } = await axios.post(`${baseURL}/tweets/${id}/like`, {}, { headers: { Authorization: `Bearer ${Token}` } })
        return data
    } catch (err) {
        console.log(err.response.data.message)
    }
}

export const removeLike = async (Token, id) => {
    try {
        const { data } = await axios.post(`${baseURL}/tweets/${id}/unlike`, {}, { headers: { Authorization: `Bearer ${Token}` } })
        return data
    } catch (err) {
        console.log(err.response.data.message)
    }
}