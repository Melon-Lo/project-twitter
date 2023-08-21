import './SignUp.scss'
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import Swal from 'sweetalert2'



export const TopIcon = ({ title }) => {
  return (
    <>
      <div className="iconBox">
        <LogoIcon className='icon' />
      </div>
      <h2 className='accountTitle'>{title}</h2>
    </>
  )
}

export const AuthInput = ({ label, placeholder, id }) => {
  // const {id} = useId()
  return (
    <div className='formContainer'>
      <div className='group'>
        {/* <label> {label} <br />
          <input type="text" placeholder={placeholder} />
        </label> */}
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" placeholder={placeholder} />

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

  const handleSubmit = (event) => {
    event.preventDefault()
    
  }

  const handleSign = () => {
    Swal.fire( {
      icon: 'success',
      title: '註冊成功',
      text: '您已經註冊，即可登入頁面。',
    })
  }

  const handleCancel = () => {
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

  return (
    // <div className='signWapper'>
      <div className="SignUpcontainer">
        <TopIcon title="建立你的帳號"/>

{/* 記得有資料後，使用.map重複渲染 */}
        <form onSubmit={handleSubmit}>
          <AuthInput 
            id="account" 
            label="帳號" 
            placeholder="請輸入帳號" 
          />
          <AuthInput
            id="name"
            label="名稱"
            placeholder="請輸入使用者名稱"
          />
          <AuthInput
            id="Email"
            label="Email"
            placeholder="請輸入Email"
          />
          <AuthInput
            id="password"
            label="密碼"
            placeholder="請設定密碼"
          />
          <AuthInput
            id="apassword-two"
            label="密碼確認"
            placeholder="請再次輸入密碼"
          />
        </form>

        <div className='btnGroup'>
          <OrangeBtn 
            way="註冊"
            onClick={handleSign}
          />
          <div className='aLink'>
            <a href="#" onClick={handleCancel}>取消</a>
          </div>
        </div>
      </div>
    // </div>
  )
}