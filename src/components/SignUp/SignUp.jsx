import './SignUp.scss'
import { useState, useEffect } from 'react'
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
import { signup } from 'api/auth'

// 信箱格式規範
const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

export const TopIcon = ({ title }) => {
  return (
    <>
      <div className="iconBox">
        <LogoIcon className='icon' />
      </div>
      <h2 className='iconTitle'>{title}</h2>
    </>
  )
}

export const AuthInput = (
  { id, 
    name, 
    value, 
    label, 
    placeholder, 
    onChange,
    valuelength,
    maxLength,
    type,
  }) => {
  return (
    <div className='formContainer'>
      <div className='group'>
        <label htmlFor={id}>{label}</label>
        <input 
          id={id}
          name={name}
          type={type} 
          value={value}
          placeholder={placeholder} 
          onChange={(event) => onChange?.(event.target.value)}
          valuelength={valuelength}
          maxLength={maxLength}
        />
        <div className="alerGroup">
          {value.length > maxLength && <div className="alertBox">
            <span className='alert'>字數超過上限!</span>
          </div>
          }
          {value.length >= 1 && <div className="numAlertBox">
            <span className='lengthNum'>{valuelength}</span>
            /
            <span className='fityNum'>{maxLength}</span>
          </div>
          } 
        </div>

      </div>
    </div>
  )
}

export const OrangeBtn = ({ way, onClick }) => {
  return (
    <button
      className='orange'
      onClick={onClick}
    >
      {way}
    </button>
  )
}

// 共用input父元件
// export const MemberInput = () => {
//   return (
//     <form action="">
//       <AuthInput
//         id="account"
//         label="帳號"
//         placeholder="請輸入帳號"
//       />
//       <AuthInput
//         id="name"
//         label="名稱"
//         placeholder="請輸入使用者名稱"
//       />
//       <AuthInput
//         id="Email"
//         label="Email"
//         placeholder="請輸入Email"
//       />
//       <AuthInput
//         id="password"
//         label="密碼"
//         placeholder="請設定密碼"
//       />
//       <AuthInput
//         id="apassword-two"
//         label="密碼確認"
//         placeholder="請再次輸入密碼"
//       />
//     </form>
//   )
// }


export const SignUp = () => {
  const navigate = useNavigate()

  // 各input的儲存狀態變數
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  // 設定5格input提示，沒通過會跳出，以及驗證全部是否通過
  const [accountAlert, setAccountAlert] = useState(false)
  const [nameAlert, setNameAlert] = useState(false)
  const [emailAlert, setEmailAlert] = useState(false)

  // 設置驗證狀態
  const [accountIsValid, setAccountIsValid] = useState(false)
  const [nameIsValid, setNameIsValid] = useState(false)
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [passwordCheckIsValid, setPasswordCheckIsValid] = useState(false)

  // 驗證函式，input改變時執行
  // 帳號大於20個字，即不通過
  function checkAccount(inputValue) {
    if (inputValue.trim().length > 20) {
      return setAccountAlert(true)
    } else {
      setAccountAlert(false)
      setAccountIsValid(true)
    }
  }

  //名稱大於50個字，即不通過
  function checkName(inputValue) {
    if (inputValue.trim().length > 50) {
      return setNameAlert(true)
    } else {
      setNameAlert(false)
      setNameIsValid(true)
    }
  }

  //如果不符合email撰寫規格，就不通過
  function checkEmail(inputValue) {
    if (!emailRule.test(inputValue)) {
      return setEmailAlert(true)
    } else {
      setEmailAlert(false)
      setEmailIsValid(true)
    }
  }

  useEffect(() => {
    account ? setAccountIsValid(true) : setAccountIsValid(false)
    name ? setNameIsValid(true) : setNameIsValid(false)
    email ? setEmailIsValid(true) : setEmailIsValid(false)
    password ? setPasswordIsValid(true) : setPasswordCheckIsValid(false)
    passwordCheck ? setPasswordCheckIsValid(true) : setPasswordCheckIsValid(false)
  })

  // 註冊按鈕、取消函式功能放一起
  // const handleSign = (event) => {
  //     //按下註冊 
  //   if (event.currentTarget.classList.contains('orange')) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: '註冊成功',
  //       text: '您已經註冊，即可登入頁面。',
  //     })
  //     // 按下取消
  //   } else if (event.currentTarget.classList.contains('cancel-link')) {
  //     Swal.fire({
  //       title: '您確定要取消註冊嗎?',
  //       showCancelButton: true,
  //       confirmButtonText: '確定',
  //     }).then((result) => {
  //       /* Read more about isConfirmed, isDenied below */
  //       if (result.isConfirmed) {
  //         Swal.fire('已取消!', '', 'success')
  //       }
  //     })
  //   }
  // }

  //按下註冊按鈕函式
  const onFormSubmit = async () => {
    // 檢驗所有使用者輸入的值，是否符合標準，符合及通過
    if (!accountIsValid || !nameIsValid || !emailIsValid || !passwordIsValid || !passwordCheckIsValid) {
      return
    }

    // 『密碼』與『密碼再確認』
    if(password !== passwordCheck) {
      Swal.fire({
        icon: 'error',
        title: '註冊失敗',
        text: '輸入兩組密碼不相符，請再重新確認。',
      })
      return
    }

    const response = await signup({account, name, email, password, passwordCheck})

    // 認證通過：送出資料，彈出成功視窗
    Swal.fire({
      icon: 'success',
      title: '註冊成功',
      text: '您已經註冊，即可進入登入頁面登入。',
    })
         
    // 送出後清空
    navigate('/login')
  }


  return (
      <div className="SignUpcontainer">
        <TopIcon title="建立你的帳號"/>

{/* 記得有資料後，使用.map重複渲染 */}
        <form>
          <AuthInput 
            type="text"
            id="account" 
            name="account"
            label="帳號" 
            value={account}
            placeholder="請輸入帳號"
            onChange={(accountInputValue) =>{  
              checkAccount(accountInputValue)
              setAccount(accountInputValue) 
            }}
            valuelength={account.length}
            maxLength="20" 
          />
          <AuthInput
            type="text"
            id="name"
            name="name"
            label="名稱"
            value={name}
            placeholder="請輸入使用者名稱"
            onChange={(nameInputValue) => {
              checkName(nameInputValue)
              setName(nameInputValue)
            }}
            valuelength={name.length}
            maxLength="50" 
          />
          <AuthInput
            type="text"
            id="email"
            name="email"
            label="Email"
            value={email}
            placeholder="請輸入Email"
          onChange={(emailInputValue) => {
             checkEmail(emailInputValue)
             setEmail(emailInputValue)
            }}
            valuelength={email.length}
            maxLength="50" 
          />
          <AuthInput
            type="password"
            id="password"
            name="password"
            label="密碼"
            value={password}
            placeholder="請設定密碼"
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            valuelength={password.length}
            maxLength="50" 

          />
          <AuthInput
            type="password"
            id="password-2"
            name="password-2"
            label="密碼確認"
            value={passwordCheck}
            placeholder="請再次輸入密碼"
            onChange={(passwordAgnInputValue) => setPasswordCheck(passwordAgnInputValue)}
            valuelength={passwordCheck.length}
            maxLength="50" 
          />
        </form>

        <div className='btnGroup'>
          <OrangeBtn 
            way="註冊"
            onClick={onFormSubmit}
          />
          <div className='aLink'>
            <a href="http://localhost:3000/login" className='cancel-link'>取消</a>
          </div>
        </div>
      </div>
  )
}