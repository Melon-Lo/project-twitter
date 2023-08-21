import './SideBar.scss'
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import HomeIcon from 'assets/icons/home_2@2x.png'
import UserIcon from 'assets/icons/user_2@2x.png'
import CogIcon from 'assets/icons/cog_2@2x.png'
import LogoutIcon from 'assets/icons/logout@2x.png'

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
                <img className="icon" src={HomeIcon} alt="homeIcon" />
              </div>
              <div className="pageTitle">
                首頁
              </div>
            </div>
            <div className="page">
              <div className="iconBox">
                <img className="icon" src={UserIcon} alt="userIcon" />
              </div>
              <div className="pageTitle">
                個人資料
              </div>
            </div>
            <div className="page">
              <div className="iconBox">
                <img className="icon" src={CogIcon} alt="cogIcon" />
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
          <img className="icon" src={LogoutIcon} alt="logoutIcon" />
        </div>
        <div className="title">
          登出
        </div>
      </div>
    </div>

  )
}