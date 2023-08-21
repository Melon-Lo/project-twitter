import './SideBar.scss'

// import dependencies
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'

// import icons
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import { ReactComponent as HomeHollowIcon } from 'assets/icons/home_hollow.svg'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as UserHollowIcon } from 'assets/icons/user_hollow.svg'
import { ReactComponent as UserIcon } from 'assets/icons/user.svg'
import { ReactComponent as CogHollowIcon } from 'assets/icons/cog_hollow.svg'
import { ReactComponent as CogIcon } from 'assets/icons/cog.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { PageContext } from 'context/PageContext'

export const SideBar = () => {
  const navigate = useNavigate()
  const path = useLocation().pathname
  const { page, setPage } = useContext(PageContext)

  useEffect(() => {
    if(path === '/home') {
      setPage('home')
    } else if(path === '/user/self') {
      setPage('user')
    } else if(path === '/setting') {
      setPage('setting')
    }
  })

  return (
    <div className="sideBarContainer">
      <div className="topSection">
        <div className="logoBox">
          <LogoIcon />
        </div>
        <div className="pages">
          <div className="page" onClick={() => {
            navigate('/home')
            setPage('home')
          }}>
            <div className="iconBox">
              {page === 'home' ? <HomeIcon className="activeIcon" /> : <HomeHollowIcon />}
            </div>
            <div className={page === 'home' ? 'activePageTitle' : 'pageTitle'}>
              首頁
            </div>
          </div>
          <div className="page" onClick={() => {
            navigate('/user/self')
            setPage('user')
          }}>
            <div className="iconBox">
              {page === 'user' ? <UserIcon className="activeIcon" /> : <UserHollowIcon />}
            </div>
            <div className={page === 'user' ? 'activePageTitle' : 'pageTitle'}>
              個人資料
            </div>
          </div>
          <div className="page" onClick={() => {
            navigate('/setting')
            setPage('setting')
          }}>
            <div className="iconBox">
              {page === 'setting' ? <CogIcon className="activeIcon" /> : <CogHollowIcon />}
            </div>
            <div className={page === 'setting' ? 'activePageTitle' : 'pageTitle'}>
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