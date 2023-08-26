import axios from "axios";
// const authURL = 'https://aqueous-dusk-12569-5142ecba44ff.herokuapp.com/api'

const authURL = 'https://todo-list.alphacamp.io/api/auth';

// 由前端內容傳入
export const login = async ({ account, password }) => {
  try {
    // response 會被封裝在 data 裡
    const { data } = await axios.post(`${authURL}/login`, {
      // 查看postman，可以看到自己送出什麼東西
      // 冒號前面是資料原本的屬性，後面是前端輸入的資料
      username: account,
      password: password,
    });

    // 把回傳的response印出來
    console.log(data)

    // 如果登入成功，可以拿到一組token
    const { authToken } = data

    // 如果登入成功，回傳 status 為 success，以及其他後端給我們的資料
    if (authToken) {
      return { status: "success", ...data };
    }

    // 登入失敗也要回傳
    return data;

  } catch (error) {
    console.error('[Login Failed]: ', error);
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