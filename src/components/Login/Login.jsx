import './Login.scss'
import Swal from 'sweetalert2'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthInput } from 'components/SignUp/SignUp'
import { TopIcon } from 'components/SignUp/SignUp'
import { OrangeBtn } from 'components/SignUp/SignUp'

// import { useAuth } from 'context/AuthContext'
// import { login } from 'api/auth'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext'

export const Login = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const { login, isAuthenticated } = useContext(AuthContext) 

  const navigate = useNavigate()

  // const { login } = useAuth()

  // const handleSubmit = (event) => {
  //   event.preventDefault()

  // }

  const handleClick = async () => {
    // 檢查格式是否符合需求
    if (account.trim().length === 0 || password.trim().length === 0) return
    const response = await login({ account, password })
    //產生錯誤訊息
    if (!response.data) {
      if (response.response.data.status === "error") return 
    }
    //成功的話可以取得該使用者的資料
    navigate('/home')
  }

  //   // 驗證當前輸入框是否有值
  //   if(account.trim().length === 0 || password.trim().length === 0) {
  //     return
  //   }

  //   // 將data設為login的回傳值
  //   const data = await login({
  //     account, password
  //   })

  //   // 如果data存在並值等於success的話，把authToken存起來
  //   // 如果data不存在（直接跳到catch了）
  //   if(data?.status === 'success') {
  //     localStorage.setItem('authToken', data.token)
  //     // 登入成功訊息
  //     Swal.fire({
  //       position: 'top',
  //       title: '登入成功！',
  //       timer: 1000,
  //       icon: 'success',
  //       showConfirmButton: false,
  //     });
  //     navigate('/home')
  //   } else {
  //     // 登入失敗訊息
  //     Swal.fire({
  //       position: 'top',
  //       title: '登入失敗！',
  //       timer: 1000,
  //       icon: 'error',
  //       showConfirmButton: false,
  //     });
  //     console.log('Login Failed.')
  //   }
  // }

  // const handleSubmit = async () => {
  //   if(account.length === 0 || password.length === 0) {
  //     return
  //   }

  //   const success = await login({
  //     account,
  //     password,
  //   })

  //   if (success) {
  //     console.log('登入成功')
  //   } else {
  //     console.log('登入失敗')
  //   }
  // }

  // 可加入context中，重複使用
  // 登入、取消、後台登入畫面事件處理，放在同一個函式中
  const handleLogin = (event) => {

    // 按下登入
    if (event.currentTarget.classList.contains('orange')) {
      // 登入成功訊息
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });

      // 等串接API後，會有登入失敗的狀況

      //按下後台登入 
    // } else if (event.currentTarget.classList.contains('back-signup-link')) {
    //   setTimeout(event.href='http://localhost:3000/admin-login', 10000)

    //   Swal.fire({
    //     icon: 'question',
    //     title: '後台登入確認',
    //     text: '您確定要登入後台頁面?',
    //   })
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

   // 可加入context中，重複使用
  // const handleCancel = () => {
  //   Swal.fire({
  //     title: '您確定要取消註冊嗎?',
  //     showCancelButton: true,
  //     confirmButtonText: '確定',
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       Swal.fire('已取消!', '', 'success')
  //     }
  //   })
  // }


  return (
    <div className='loginContainer'>
      <TopIcon title="登入 Alphitter" />

      {/* 記得有資料後，使用.map重複渲染 */}
      {/* <form onSubmit={handleSubmit}> */}
        <AuthInput
          id="account"
          label="帳號"
          value={account}
          placeholder="請輸入帳號"
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <AuthInput
          id="password"
          text="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      {/* </form> */}
      <div className='btnGroup'>
        <OrangeBtn
          way="登入"
          onClick={handleClick}
        />
        <div className='aLink'>
          <a href="#" className='cancel-link' onClick={handleLogin}>取消</a>
          <span className='point'>&bull;</span>
          <Link to="http://localhost:3000/admin-login" className='back-signup-link'>
            後台登入
          </Link>

          {/* 不確定這樣寫O不OK */}
          {/* <a href="http://localhost:3000/admin-login" className='back-signup-link' onClick={handleLogin}>後台登入</a> */}
        </div>
      </div>
    </div>
  )
}