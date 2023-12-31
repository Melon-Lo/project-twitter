import axios from "axios";
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

// 取得某一使用者的資料
// GET: /users/:id
export const getUserData = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/users/${id}`)
    return res.data
  } catch (error) {
    console.error("[Get UserData Failed]: ", error.response.data.message)
  }
}

// 取得指定使用者的所有追蹤者
// GET: /users/:id/followings
export const getUserFollowings = async(id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/users/${id}/followings`)
    return res.data
  } catch (error) {
    console.error("[Get UserFollowings Failed]: ", error.response.data.message)
  }
}

// 取得指定使用者的所有追隨者
// GET: /users/:id/followers
export const getUserFollowers = async(id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/users/${id}/followers`)
    return res.data
  } catch (error) {
    console.error("[Get UserFollowers Failed]: ", error.response.data.message)
  }
}

// 設定頁面：修改指定使用者的資料
// PUT: /users/:id
export const putUserData = async({ id, account, name, introduction, banner, password, avatar, email, checkPassword }) => {
  try {
    const res = await axiosInstance.put(`${baseURL}/users/${id}`, {account, name, introduction, banner, password, avatar, email, checkPassword})
    return res.data
  } catch (error) {
    console.error('[Put UserData Failed]: ', error)
  }
}

// EditModal：修改指定使用者的資料
// PUT: /users/:id
export const putSelfData = async(id, formData) => {
  try {
    const res = await axiosInstance.put(`${baseURL}/users/${id}`, formData)
    return res.data
  } catch (error) {
    console.error('[Put UserData Failed]: ', error)
  }
}

// 取得追蹤數前十名的用戶
// GET: /followships/top10
export const getTop10Users = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/followships/top10`)
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.error("[Get Top10 Users Failed]: ", error.response.data.message)
  }
}