// import scss
import './AdminSideBar.scss'

// import dependencies
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

//import context
import { PageContext } from 'context/PageContext'

// import icons
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as HomeHollowIcon } from 'assets/icons/home_hollow.svg'
import { ReactComponent as UserIcon } from 'assets/icons/user.svg'
import { ReactComponent as UserHollowIcon } from 'assets/icons/user_hollow.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import clsx from 'clsx'



export const AdminSideBar = () => {
  const navigate = useNavigate()
  const path = useLocation().pathname
  const { adminPage, setAdminPage } = useContext(PageContext)

  useEffect(() => {
    if (path === '/admin_main') {
      setAdminPage('tweet')
    } else if (path ==='/admin_users') {
      setAdminPage('users')
    }
  })

  //回到推文清單 
  const handleTweet = () => {
    navigate('/admin_main')
    setAdminPage('tweet')
  }

  // 回到使用者列表
  const handleUser = () => {
    navigate('/admin_users')
    setAdminPage('users')
  }

  // 後台登出
  const handleAdminLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo')
    navigate('/admin-login')
  }

  return (
    <div className='adminSideBarWrapper'>
      <div className="adminSiderBarContainer">

        {/* top */}
        <div className="topSection">

          <div className="logoIconBox">
            <LogoIcon />
          </div>
          <div className="lists">
            <div 
              className="list" 
              onClick={handleTweet}
            >
              <div className="iconsBox">
                {/* <HomeIcon className='activeIcon' /> */}
                {adminPage === 'tweet' ? <HomeIcon className='activeIcon' /> : <HomeHollowIcon />}
              </div>
              <div className={adminPage === 'tweet' ? 'activePage' : 'pageTitle'}>
                推文清單
              </div>
            </div>
            <div 
              className="list"
              onClick={handleUser}
            >
              <div className="iconsBox">
                {/* <UserIcon className='activeIcon' /> */}
                {adminPage === 'users' ? <UserIcon className='activeIcon' /> : <UserHollowIcon />}
              </div>
              <div className={adminPage === 'users'? 'activePage': 'pageTitle'}>
                使用者列表
              </div>
            </div>

          </div>

        </div>

        {/* bottom */}
        <div 
          className="bottomSection"
          onClick={handleAdminLogout}
        >
          <div className="iconBox">
            <LogoutIcon className='icon'/>
          </div>
          <div className="title">
            登出
          </div>
        </div>
      </div>
    </div>
  )
}