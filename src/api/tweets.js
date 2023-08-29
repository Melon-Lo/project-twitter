import axios from "axios";
import { async } from "q";
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

// 瀏覽所有tweets
// /tweets
export const getAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets`)
    // console.log("getAllTweets回傳值：", res.data)
    return res.data
  } catch (error) {
    console.error("[Get AllTweets Failed]: ", error.response.data.message)
  }
}

// 瀏覽某一推文
// /tweets/:tweet_id
export const getTweet = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets/${id}`)
    return res.data
  } catch (error) {
    console.error("[Get Tweet Failed]: ", error.response.data.message)
  }
}

// 瀏覽某一推文所有留言
// /tweets/:tweet_id/replies
export const getReplies = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets/${id}/replies`)
    return res.data
  } catch (error) {
    console.error("[Get Replies Failed]: ", error.response.data.message)
  }
}

// 瀏覽某一使用者的tweets
// /users/:id/tweets
export const getUserTweets = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/users/${id}/tweets`)
    // console.log("getUserTweets回傳值：", res.data)
    return res.data
  } catch (error) {
    console.error("[Get UserTweets Failed]: ", error.response.data.message)
  }
}

// 瀏覽某一使用者的回覆
// /users/:id/replied_tweets
export const getUserReplies = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/users/${id}/replied_tweets`)
    // console.log("getUserReplies回傳值：", res.data)
    return res.data
  } catch (error) {
    console.error("[Get UserReplies Failed]: ", error.response.data.message)
  }
}

// 瀏覽某一使用者喜歡的tweets
// /users/:id/likes
export const getUserLikes = async (id) => {
  try {
    const res = axiosInstance.get(`${baseURL}/users/${id}/likes`);
    // console.log("getUserLikes回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get UserLikes Failed]: ", error.response.data.message);
  }
};