import './OtherUser.scss'

// import dependencies
import { useState, useEffect, useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { PageContext } from 'context/PageContext'
import { useNavigate } from 'react-router-dom'
import { TabContext } from 'context/TabContext'
import clsx from 'clsx'

// import components
import { Tab } from 'components/Tab/Tab'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'
import { ReactComponent as MailHollowIcon } from 'assets/icons/mail_hollow.svg'
import { ReactComponent as NotiHollowIcon } from 'assets/icons/noti_hollow.svg'
import { ReactComponent as NotiActiveIcon } from 'assets/icons/noti_active.svg'

// import api
import { getUserData } from 'api/users'

export const OtherUser = () => {
  const [following, setFollowing] = useState(false)
  const [noti, setNoti] = useState(false)
  const { setFollowTab } = useContext(TabContext)
  const navigate = useNavigate()
  const { setUser } = useContext(PageContext)

  // 取得使用者ID
  const id = localStorage.getItem("otherUserId")
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [avatar, setAvatar] = useState('')
  const [banner, setBanner] = useState('')
  const [followingsCount, setFollowingsCount] = useState('')
  const [followersCount, setFollowersCount] = useState('')
  const [tweetsCount, setTweetsCount] = useState('')
  const [introduction, setIntroduction] = useState('')

  // 取得使用者資料
  useEffect(() => async () => {
    // 他人頁面初始值
    setUser("other")

    const getUserDataAsync = async () => {
      try {
        const data = await getUserData(id)
        // 儲存使用者資料
        setName(data.name)
        setAccount(data.account)
        setAvatar(data.avatar)
        setBanner(data.banner)
        setFollowersCount(data.followersCount)
        setFollowingsCount(data.followingsCount)
        setTweetsCount(data.tweetsCount)
        setIntroduction(data.introduction)
        // console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    getUserDataAsync()
  }, [])  

  return (
    <div className="userContainer">
      <div className="topSection">
        <div className="title">
          <div className="iconBox" onClick={() => navigate('/main')}>
            <BackIcon />
          </div>
          <div className="titleContent">
            <div className="name">{name}</div>
            <div className="tweets">{tweetsCount} 推文</div>
          </div>
        </div>
        <div className="userBox">
          <div className="coverBox">
            <img src={banner} alt="coverImage" />
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
                  {followingsCount}個
                </b>
                  追蹤中
              </div>
              <div className="follower">
                <b onClick={() => {
                  setFollowTab('follower')
                  navigate('follower')
                }}>
                  {followersCount}位
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