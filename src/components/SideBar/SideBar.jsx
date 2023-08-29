import './SideBar.scss'

// import dependencies
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PageContext } from 'context/PageContext'
import { ModalContext } from 'context/ModalContext'
import Swal from 'sweetalert2'

// import icons
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import { ReactComponent as HomeHollowIcon } from 'assets/icons/home_hollow.svg'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as UserHollowIcon } from 'assets/icons/user_hollow.svg'
import { ReactComponent as UserIcon } from 'assets/icons/user.svg'
import { ReactComponent as CogHollowIcon } from 'assets/icons/cog_hollow.svg'
import { ReactComponent as CogIcon } from 'assets/icons/cog.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'

export const SideBar = () => {
  const navigate = useNavigate()
  const path = useLocation().pathname
  const { setShowModal } = useContext(ModalContext)
  const { page, setPage, setUser } = useContext(PageContext)

  function handleLogout() {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("authToken")
    localStorage.removeItem("otherUserId")
    navigate('/login')
  }

  useEffect(() => {
    if(path === '/main') {
      setPage('main')
    } else if(path === '/user/self') {
      setPage('user')
    } else if(path === '/setting') {
      setPage('setting')
    }
  }, [path])

  return (
    <div className="sideBarContainer">
      <div className="topSection">
        <div className="logoBox">
          <LogoIcon />
        </div>
        <div className="pages">
          <div className="page" onClick={() => {
            navigate('/main')
            setPage('main')
          }}>
            <div className="iconBox">
              {page === 'main' ? <HomeIcon className="activeIcon" /> : <HomeHollowIcon />}
            </div>
            <div className={page === 'main' ? 'activePageTitle' : 'pageTitle'}>
              首頁
            </div>
          </div>
          <div className="page" onClick={() => {
            navigate('/user/self')
            setPage('user')
            setUser('self')
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
        <button className="tweetsButton" onClick={() => {
          navigate('/main/tweet')
          setShowModal(true)
        }}>
          推文
        </button>
      </div>
      <div className="bottomSection" onClick={() => {
        // 按下登出鍵後跳出確認提示
        Swal.fire({
          title: "你確定要登出嗎？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "確定",
          confirmButtonColor: "#FF6600",
          cancelButtonText: "取消"
        }).then((result) => {
          // 按下「確認」後，執行動作
          if(result.isConfirmed) {
            handleLogout()
          } 
        })
      }}>
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