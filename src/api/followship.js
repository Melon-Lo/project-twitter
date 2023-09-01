import axios from 'axios';
const baseURL = 'https://simple-twitter-0901-98d00e19f6cc.herokuapp.com/api'

// 新增一個 instance
const axiosInstance = axios.create({
  baseURL: baseURL,
})

// 在axiosInstance 使用 interceptors 方法
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// 加入追蹤
// POST: /followships
export const addFollowing = async (id) => {
  try {
    const { data } = await axiosInstance.post(`${baseURL}/followships`, { id })
    console.log(data)
    return data
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// 取消追蹤
// DEL: /followships/:followingId
export const removeFollowing = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`${baseURL}/followships/${id}`)
    return data
  } catch (err) {
    console.log(err.response.data.message)
  }
}