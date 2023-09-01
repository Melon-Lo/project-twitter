import './Setting.scss'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react'

// API
import { putUserData } from 'api/users';

// 信箱格式規範
const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

export const Setting = () => {
  // 取得當前使用者的id
  const { id } = JSON.parse(localStorage.getItem("userInfo"))

  // 設置每個 input 的狀態
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  // 字數統計與字數限制
  const accountLength = account.length
  const nameLength = name.length
  const accountLimit = 20
  const nameLimit = 50

  // 設置驗證狀態
  const [accountIsValid, setAccountIsValid] = useState(false)
  const [nameIsValid, setNameIsValid] = useState(false)
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [passwordCheckIsValid, setPasswordCheckIsValid] = useState(false)

  // 設置驗證提示，若沒通過則跳出
  const [accountAlert, setAccountAlert] = useState(false)
  const [nameAlert, setNameAlert] = useState(false)
  const [emailAlert, setEmailAlert] = useState(false)

  // 驗證函式，每次input改變時執行
  function checkAccount(inputValue) {
    // 如果帳號大於20個字符，不通過
    if(inputValue.trim().length > accountLimit) {
      return setAccountAlert(true)
    } else {
      setAccountAlert(false)
      setAccountIsValid(true)
    }
  }
  function checkName(inputValue) {
    // 如果名字大於50個字符，不通過
    if(inputValue.trim().length > nameLimit) {
      setNameAlert(true)
    } else {
      setNameAlert(false)
      setNameIsValid(true)
    }
  }
  function checkEmail(inputValue) {
    // 如果信箱不符合emailRule，不通過
    if(!emailRule.test(inputValue)) {
      setEmailAlert(true)
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

  // 表單送出函式，當驗證全通過時才會送出
  const onFormSubmit = async (e) => {
    e.preventDefault()

    // 認證不通過：不送出
    if(!accountIsValid || !nameIsValid || !emailIsValid || !passwordIsValid || !passwordCheckIsValid) {
      return
    }

    // 「密碼」與「密碼再確認」不相同：不送出，彈出警告視窗
    if(password !== passwordCheck) {
      Swal.fire("兩次輸入的密碼不相符！")
      return
    }

    console.log(passwordCheck)
    const res = await putUserData({id, account, name, email, password, checkPassword: passwordCheck})
    console.log(res)

    // 認證通過：送出資料，彈出成功視窗
    Swal.fire("修改成功！")

    // 確認輸入
    console.log(account)
    console.log(name)
    console.log(email)
    console.log(password)

    // 送出後清空
    setAccount('')
    setName('')
    setEmail('')
    setPassword('')
    setPasswordCheck('')
  }

  return (
    <div className="settingContainer">
      <div className="topSection">
        <p className="title">帳戶設定</p>
      </div>
      <div className="bottomSection">
        <form className="settingForm">
          <div className="input">
            <div className="inputLabel">帳號</div>
            <input 
              name="account" 
              className="inputBox" 
              type="text" 
              onChange={(e) => {
                checkAccount(e.target.value)
                setAccount(e.target.value)
              }}
              value={account}
            />
            {accountAlert && <div className='validationAlert'>帳號字數超過上限！（最多20字）</div>}
            <div className="wordCount">
              {accountLength}/{accountLimit}
            </div>
          </div>
          <div className="input">
            <div className="inputLabel">名稱</div>
            <input 
              name="name" 
              className="inputBox" 
              type="text" 
              onChange={(e) => {
                checkName(e.target.value)
                setName(e.target.value)
              }}
              value={name}
            />
            {nameAlert && <div className='validationAlert'>名稱字數超過上限！（最多50個字）</div>}
            <div className="wordCount">
              {nameLength}/{nameLimit}
            </div>
          </div>
          <div className="input">
            <div className="inputLabel">Email</div>
            <input 
              name="email" 
              className="inputBox" 
              type="text" 
              onChange={(e) =>{
                checkEmail(e.target.value)
                setEmail(e.target.value)
              }}
              value={email}
            />
            {emailAlert && <div className='validationAlert'>信箱不符合規定格式！</div>}
          </div>
          <div className="input">
            <div className="inputLabel">密碼</div>
            <input 
              name="password" 
              className="inputBox" 
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="input">
            <div className="inputLabel">密碼再確認</div>
            <input 
              name="passwordCheck" 
              className="inputBox" 
              type="password" 
              onChange={(e) => {
                console.log(e.target.value)
                setPasswordCheck(e.target.value)
              }}
              value={passwordCheck}
            />
          </div>
        </form>
        <div className="buttonBox">
          {/* 若驗證未通過，送出鈕樣式不同，點按也不會送出 */}
          <button 
            className={accountIsValid & nameIsValid & emailIsValid & passwordIsValid & passwordCheckIsValid ? 'valid' : 'invalid'}
            onClick={(e) => onFormSubmit(e)}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  )
}