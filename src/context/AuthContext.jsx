import { login, adminLogin } from 'api/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'


const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  adminLogin: null,
  logout: null,
};

export const AuthContext = createContext(defaultAuthContext);
export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [payload, setPayload] = useState(null)

  // 儲存userInfo物件，裡面包含 account、name、id 等資訊
  const [userInfo, setUserInfo] = useState({})
  // 儲存使用者點擊想看的tweetId
  const [tweetId, setTweetId] = useState(null)
  // 儲存使用者點擊想看的 tweet user account
  const [userTweetAccount, setUserTweetAccount] = useState('')
  // 儲存使用者所有已回覆的 tweet
  const [userReplyList, setUserReplyList] = useState([]);
  // 若自己有Tweet更新
  const [isTweetUpdated, setIsTweetUpdated] = useState(false)
  // 若有更動過個人資料
  const [isUserEdited, setIsUserEdited] = useState(false)
  // 若有更新過喜歡推文
  const [isUpdateLikes, setIsUpdateLikes] = useState(false)
  // 若有更新過回覆推文
  const [isUpdatedReplies, setIsUpdatedReplies] = useState(false) 

  const { pathname } = useLocation();
  const navigate = useNavigate()

  function handleSetTweetIdClick(tweetIdReceived) {
    setTweetId(tweetIdReceived)
    localStorage.setItem("tweetId", tweetIdReceived)
  }

  // 儲存點擊的 tweet user account
  function handleSetUserTweetAccount(accountReceived) {
    setUserTweetAccount(accountReceived);
    localStorage.setItem("userTweetAccount", accountReceived);
  };

  // 換頁要驗證 token
  useEffect(() => {
    // 如果換頁目的是要去登入／註冊頁的話，不用驗證
    if(pathname === '/login' || pathname === '/signup' || pathname === '/admin-login') return

    //更新完Tweet後，要把isTweetUpdated退回false狀態
    setIsTweetUpdated(false)
    //更新完個人編輯資料後，要把isUserEdited退回false
    setIsUserEdited(false)
    //更新過回覆推文後，要把isUpdatedReplies退回false
    setIsUpdatedReplies(false)
    //更新過回覆推文後，要把isUpdateLikes退回false
    setIsUpdateLikes(false)

    // 驗證函式
    const checkTokenIsValid = async () => {
      // 從localStorage拿token
      const authToken = localStorage.getItem("authToken")

      // 如果token不存在
      if(!authToken) {
        setIsAuthenticated(false)
        setPayload(null)
        return navigate('/login')
      }

      // 如果token存在
      if(authToken) {
        // 解析authToken內容成可閱讀的東西
        const tempPayload = jwt_decode(authToken)
        setPayload(tempPayload)

        // 分析解析後的payload，確認是否有該使用者
        if(!tempPayload) {
          setIsAuthenticated(false)
          setPayload(null)
          return navigate('/login')
        }

        setIsAuthenticated(true)
        
        // 使用localStorage中的userInfo來初始化
        const savedUserInfo = localStorage.getItem("userInfo")
        if(savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo))
        }

        // 使用localStorage中的tweetId來初始化
        const savedTweetId = localStorage.getItem("tweetId");
        if (savedTweetId) {
          setTweetId(savedTweetId);
        }

      } else {
        // 無效
        setIsAuthenticated(false)
        setPayload(null)
        navigate('/login')
      }
    }

    // 執行驗證函式
    checkTokenIsValid()
    // console.log('AuthProvider re-rendered.')

  // 當路徑改變或執行轉跳時時進行驗證
  }, [pathname, navigate])

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        userInfo,
        tweetId,
        handleSetTweetIdClick,
        handleSetUserTweetAccount,
        userReplyList,
        setUserReplyList,
        isTweetUpdated,
        setIsTweetUpdated,
        isUserEdited,
        setIsUserEdited,
        isUpdatedReplies,
        setIsUpdatedReplies,
        isUpdateLikes,
        setIsUpdateLikes,

        login: async (data) => {
          const response = await login({
            account: data.account,
            password: data.password
          })

          // 若成功可以把payload的資料讓所有頁面看到
          if(response.data) {
            if(response.data.status === "success") {
              const authToken = response.data.token
              // 解析資料
              const tempPayload = jwt_decode(authToken)
              setPayload(tempPayload)
              setIsAuthenticated(true)
              setCurrentUser({
                id: tempPayload.id
              })
              // 儲存token
              localStorage.setItem("authToken", authToken)

              // 儲存使用者資料
              setUserInfo(response.data.User)
              localStorage.setItem("userInfo", JSON.stringify(response.data.user))
            }
            // 若抓到的response不合條件，回傳response讓LoginPage去做錯誤顯示
          } else {
            setPayload(null)
            setIsAuthenticated(false)
          }
          
          return response
        },
        adminLogin: async (data) => {
          const response = await adminLogin({
            account: data.account,
            password: data.password
          })
        

          if (response) {
            if (response.status === "success") {
              const authToken = response.token
              // 解析資料
              const tempPayload = jwt_decode(authToken)
              setPayload(tempPayload)
              setIsAuthenticated(true)
              setCurrentUser({
                id: tempPayload.id
              })
              // 儲存token
              localStorage.setItem("authToken", authToken)

              // 儲存使用者資料
              setUserInfo(response.user)
              localStorage.setItem("userInfo", JSON.stringify(response.user))
            }
            // 若抓到的response不合條件，回傳response讓LoginPage去做錯誤顯示
          } else {
            setPayload(null)
            setIsAuthenticated(false)
          }
          return response
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
