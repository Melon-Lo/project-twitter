export const SideBar = () => {
  return (
    <div className="sideBarContainer">
      <div className="topSection">
        <div className="logoBox">Logo</div>
          <div className="functions">
            <div className="function">首頁</div>
            <div className="function">個人資料</div>
            <div className="function">設定</div>
          </div>
        <div className="articlesButton">推文</div>
      </div>
      <div className="bottomSection">
        <div className="logoutBox">登出</div>
      </div>
    </div>

  )
}