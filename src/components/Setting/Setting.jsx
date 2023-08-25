import './Setting.scss'

export const Setting = () => {
  return (
    <div className="settingContainer">
      <div className="topSection">
        <p className="title">帳戶設定</p>
      </div>
      <div className="bottomSection">
        <form className="settingForm">
          <div className="input">
            <div className="inputLabel">帳號</div>
            <input name="account" className="inputBox" type="text" />
          </div>
          <div className="input">
            <div className="inputLabel">名稱</div>
            <input name="name" className="inputBox" type="text" />
          </div>
          <div className="input">
            <div className="inputLabel">Email</div>
            <input name="email" className="inputBox" type="text" />
          </div>
          <div className="input">
            <div className="inputLabel">密碼</div>
            <input name="password" className="inputBox" type="password" />
          </div>
          <div className="input">
            <div className="inputLabel">密碼再確認</div>
            <input name="passwordCheck" className="inputBox" type="password" />
          </div>
        </form>
        <div className="buttonBox">
          <button className="save">儲存</button>
        </div>
      </div>
    </div>
  )
}