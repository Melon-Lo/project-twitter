import axios from "axios";
const baseURL = 'https://simple-twitter-0827-5fac12a34439.herokuapp.com/api'

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

// 取得某一使用者的資料
// GET: /users/:id
export const getUserData = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/users/${id}`)
    return res.data
  } catch (error) {
    console.error("[Get UserData Failed]:", error.response.data.message)
  }
}