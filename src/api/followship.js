import axios from 'axios';
const baseURL = 'https://simple-twitter-0901-98d00e19f6cc.herokuapp.com/api'

// 加入追蹤
// POST: /followships
export const addFollowing = async (Token, id) => {
  try {
    const { data } = await axios.post(`${baseURL}/followships`, { id }, { headers: { Authorization: `Bearer ${Token}` } })
    return data
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// 取消追蹤
// DEL: /followships/:followingId
export const removeFollowing = async (Token, id) => {
  try {
    const { data } = await axios.delete(`${baseURL}/followships/${id}`, { headers: { Authorization: `Bearer ${Token}` } })
    return data
  } catch (err) {
    console.log(err.response.data.message)
  }
}