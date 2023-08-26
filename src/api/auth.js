import axios from "axios";
const authURL = 'https://aqueous-dusk-12569-5142ecba44ff.herokuapp.com/api'

// const authURL = 'https://todo-list.alphacamp.io/api/auth';

// 由前端內容傳入
export const login = async ({ account, password }) => {
  try {
    // response 會被封裝在 data 裡
    const { data } = await axios.post(`${authURL}/users/login`, {
      // 查看postman，可以看到自己送出什麼東西
      // 冒號前面是資料原本的屬性，後面是前端輸入的資料
      account,
      password,
    });

    // 把回傳的response印出來
    console.log(data)

    // 如果登入成功，可以拿到一組authToken
    // 解構賦值：下面這行等於 token = data.token
    const { token } = data

    // 如果登入成功，status就會是success，以及其他後端給我們的資料
    if (token) {
      return { status: "success", ...data };
    }

    // 登入失敗也要回傳
    return data;
    
  } catch (error) {
    console.log('[Login Failed]: ', error.response.data.message);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Register Failed]: ', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};