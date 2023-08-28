import './User.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router-dom'
import { TabContext } from 'context/TabContext'

// import components
import { EditModal } from 'components/Modal/EditModal'
import { Tab } from 'components/Tab/Tab'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'

export const User = () => {
  const { showModal, setShowModal } = useContext(ModalContext)
  const { setFollowTab } = useContext(TabContext)
  const navigate = useNavigate()

  // 取得使用者資料
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const { avatar, account, name, introduction } = userInfo
  // const { cover, followingCount, followerCount } = userInfo

  return (
    <div className="userContainer">
      <div className="topSection">
        <div className="title">
          <div className="iconBox" onClick={() => navigate('/main')}>
            <BackIcon />
          </div>
          <div className="titleContent">
            <div className="name">Liz</div>
            <div className="tweets">45 推文</div>
          </div>
        </div>
        {showModal &&
          <EditModal />
        }
        <div className="userBox">
          <div className="coverBox">
            <img src="https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095_3x2.jpg" alt="coverImage" />
          </div>
          <div className="infoBox">
            <button onClick={() => {
              setShowModal(true)
              navigate('edit')
            }}>
              編輯個人資料
            </button>
            <div className="avatarBox">
              <img className="avatar" src={avatar} alt="avatar" />
            </div>
            <div className="info">
              <div className="name">{name}</div>
              <div className="account">@{account}</div>
              <div className="description">{introduction}</div>
              <div className="countData">
              <div className="following">
                <b onClick={() => {
                  setFollowTab('following')
                  navigate('following')
                }}>
                  10個
                  {/* {followingCount}個 */}
                </b>
                  追蹤中
              </div>
              <div className="follower">
                <b onClick={() => {
                  setFollowTab('follower')
                  navigate('follower')
                }}>
                  9個
                  {/* {followerCount}個 */}
                </b>
                  追蹤者
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Tab />
    </div>
  )
}