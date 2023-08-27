import './AdminLogin.scss'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthInput } from 'components/SignUp/SignUp'
import { TopIcon } from 'components/SignUp/SignUp'
import { OrangeBtn } from 'components/SignUp/SignUp'

export const AdminLogin = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

  }

  // 註冊按鈕、取消函式功能放一起
  const handleLogin = (event) => {
    // 按下登入
    if (event.currentTarget.classList.contains('orange')) {
      let timerInterval
      Swal.fire({
        title: '登入中',
        html: '載入登入頁面中，請稍候',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })

      // 按下取消
    } else if (event.currentTarget.classList.contains('cancel-link')) {
      Swal.fire({
        title: '您確定要取消註冊嗎?',
        showCancelButton: true,
        confirmButtonText: '確定',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('已取消!', '', 'success')
        }
      })
    }
  }

  return (
    <div className='adminLoginContainer'>
      <TopIcon title="後台登入" />

      {/* 記得有資料後，使用.map重複渲染 */}
      <form onSubmit={handleSubmit}>
        <AuthInput
          id="account"
          label="帳號"
          value={account}
          placeholder="請輸入帳號"
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          valuelength={account.length}
          maxlenth="20" 
        />
        <AuthInput
          id="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          valuelength={password.length}
          maxlenth="50" 
        />
      </form>
      <div className='btnGroup'>
        <OrangeBtn
          way="登入"
          onClick={handleLogin}
        />
        <div className='aLink'>
          <Link to="http://localhost:3000/login">前台登入</Link>

          {/* <a href="#" className='back-signup-link' onClick={handleLogin}>前台登入</a> */}
        </div>
      </div>
    </div>
  )
}