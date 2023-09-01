import './Login.scss'
import Swal from 'sweetalert2'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthInput } from 'components/SignUp/SignUp'
import { TopIcon } from 'components/SignUp/SignUp'
import { OrangeBtn } from 'components/SignUp/SignUp'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext'

export const Login = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const { login, setIsAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleClick = async () => {
    // 檢查格式是否符合需求
    if (account.trim().length === 0 || password.trim().length === 0) return
    const response = await login({ account, password })

    // 登入失敗
    if (!response.data) {
      if (response.response.data.status === "error")
        setIsAuthenticated(false)
      // 登入失敗訊息
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }

    // 登入成功
    // 登入成功訊息
    Swal.fire({
      position: 'top',
      title: '登入成功！',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
    });
    setIsAuthenticated(true)
    navigate('/main')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  let userInfo = {}
  let role = ""
  if (localStorage.getItem("userInfo")) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"))
    role = userInfo.role

  }

  useEffect(() => {
    if (role === "user") {
      navigate("/main")
    } else if (role === "admin") {
      navigate("/admin_main")
    } else {
      navigate("/login")
    }
  }, [])


  return (
    <div className='loginContainer'>
      <TopIcon title="登入 Alphitter" />

      {/* 記得有資料後，使用.map重複渲染 */}
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="account"
          name="account"
          type="text"
          label="帳號"
          value={account}
          placeholder="請輸入帳號"
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          valuelength={account.length}
          textlength="20"
        />
        <AuthInput
          id="password"
          name="account"
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          valuelength={password.length}
          textlength="50"
        />
      </form>
      <div className='btnGroup'>
        <OrangeBtn
          way="登入"
          onClick={handleClick}
        />
        <div className='aLink'>
          <a href="#" className='cancel-link' onClick={() => navigate('/signup')}>註冊
          </a>
          <span className='point'>&bull;</span>
          <Link to="http://localhost:3000/admin-login" className='back-signup-link'>
            後台登入
          </Link>
        </div>
      </div>
    </div>
  )
}