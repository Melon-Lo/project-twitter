import './SideBar.scss'

// import icons
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import { ReactComponent as HomeHollowIcon } from 'assets/icons/home_hollow.svg'
import { ReactComponent as UserHollowIcon } from 'assets/icons/user_hollow.svg'
import { ReactComponent as CogHollowIcon } from 'assets/icons/cog_hollow.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'

export const SideBar = () => {
  return (
    <div className="sideBarContainer">
      <div className="topSection">
        <div className="logoBox">
          <LogoIcon />
        </div>
        <div className="pages">
            <div className="page">
              <div className="iconBox">
                <HomeHollowIcon />
              </div>
              <div className="pageTitle">
                首頁
              </div>
            </div>
            <div className="page">
              <div className="iconBox">
                <UserHollowIcon />
              </div>
              <div className="pageTitle">
                個人資料
              </div>
            </div>
            <div className="page">
              <div className="iconBox">
                <CogHollowIcon />
              </div>
              <div className="pageTitle">
                設定
              </div>
            </div>
        </div>
        <button className="tweetsButton">推文</button>
      </div>
      <div className="bottomSection">
        <div className="iconBox">
          <LogoutIcon />
        </div>
        <div className="title">
          登出
        </div>
      </div>
    </div>
  )
}