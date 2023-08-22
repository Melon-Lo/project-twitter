import './OtherUser.scss'

// import dependencies
import { useState, useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router-dom'
import { TabContext } from 'context/TabContext'
import clsx from 'clsx'

// import components
import { EditModal } from 'components/Modal/EditModal'
import { Tab } from 'components/Tab/Tab'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'
import { ReactComponent as MailHollowIcon } from 'assets/icons/mail_hollow.svg'
import { ReactComponent as NotiHollowIcon } from 'assets/icons/noti_hollow.svg'
import { ReactComponent as NotiActiveIcon } from 'assets/icons/noti_active.svg'

export const OtherUser = () => {
  const [following, setFollowing] = useState(false)
  const [noti, setNoti] = useState(false)
  const { showModal } = useContext(ModalContext)
  const { setFollowTab } = useContext(TabContext)
  const navigate = useNavigate()

  return (
    <div className="userContainer">
      <div className="topSection">
        <div className="title">
          <div className="iconBox" onClick={() => navigate('/home')}>
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
            <div className="buttons">
              <div className="mailIconBox">
                <MailHollowIcon className="mailIcon"/>
              </div>
              {noti ?
                <div className="notiIconBoxActive" onClick={() => setNoti(!noti)}>
                  <NotiActiveIcon className="notiIconActive"/>
                </div> :
                <div className="notiIconBox" onClick={() => setNoti(!noti)}>
                  <NotiHollowIcon className="notiIcon"/>
                </div> 
              }
              <button 
                className={clsx('follow', { following: following })} 
                onClick={() => setFollowing(!following)}
              >
                {following ? '正在跟隨' : '跟隨'}
              </button>
            </div>
            <div className="avatarBox">
              <img className="avatar" src="https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-02-768x768.png" alt="avatar" />
            </div>
            <div className="info">
              <div className="name">Liz</div>
              <div className="account">@liz</div>
              <div className="description">I am a beautiful girl.</div>
              <div className="countData">
              <div className="following">
                <b onClick={() => {
                  setFollowTab('following')
                  navigate('following')
                }}>
                  10個
                </b>
                  追蹤中
              </div>
              <div className="follower">
                <b onClick={() => {
                  setFollowTab('follower')
                  navigate('follower')
                }}>
                  9位
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