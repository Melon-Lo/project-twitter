import './AdminLogin.scss'
import Swal from 'sweetalert2'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthInput } from 'components/SignUp/SignUp'
import { TopIcon } from 'components/SignUp/SignUp'
import { OrangeBtn } from 'components/SignUp/SignUp'
import { AuthContext } from 'context/AuthContext'

export const AdminLogin = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { adminLogin, setIsAuthenticated } = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault()

  }


  // 後台登入函式事件
  const handleClick = async () => {
    // 檢查格式是否符合需求
    if (account.trim().length === 0 || password.trim().length === 0) return
    const response = await adminLogin({ account, password })

    // 登入失敗
    if (!response) {
      if (response.status !== "success")
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
    navigate('/admin_main')
  }


  return (
    <div className='adminLoginContainer'>
      <TopIcon title="後台登入" />

      {/* 記得有資料後，使用.map重複渲染 */}
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="account"
          type="text"
          label="帳號"
          value={account}
          placeholder="請輸入帳號"
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          valuelength={account.length}
          textLength="20"
        />
        <AuthInput
          id="password"
          name="password"
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          valuelength={password.length}
          textLength="50"
        />
      </form>
      <div className='btnGroup'>
        <OrangeBtn
          way="登入"
          onClick={handleClick}
        />
        <div className='aLink'>
          <Link to="http://localhost:3000/login">前台登入</Link>
        </div>
      </div>
    </div>
  )
}