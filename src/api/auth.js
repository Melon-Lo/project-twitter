import axios from "axios";
const authURL = 'https://simple-twitter-0827-5fac12a34439.herokuapp.com/api'


// 使用者登入
// POST: /users/login
export const login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${authURL}/users/login`, {
      account,
      password,
    });
    return response;
  } catch (error) {
    console.error("[Login Failed]", error);
    return error;
  }
};

// 使用者註冊
// POST: /users
export const signup = async ({account, name, email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {account, name, password, email, checkPassword: password });

    return data;
  } catch (error) {
    console.error('[Register Failed]: ', error);
  }
};

// export const checkPermission = async (authToken) => {
//   try {
//     const response = await axios.get(`${authURL}/test-token`, {
//       headers: {
//         Authorization: 'Bearer ' + authToken,
//       },
//     });
//     return response.data.success;
//   } catch (error) {
//     console.error('[Check Permission Failed]:', error);
//   }
// };