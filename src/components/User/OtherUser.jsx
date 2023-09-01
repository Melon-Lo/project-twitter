import './OtherUser.scss'

// import dependencies
import { useState, useEffect, useContext } from 'react'
import { PageContext } from 'context/PageContext'
import { useNavigate } from 'react-router-dom'
import { TabContext } from 'context/TabContext'

// import components
import { OtherTab } from 'components/Tab/OtherTab'

// import icons & images
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'
import { ReactComponent as MailHollowIcon } from 'assets/icons/mail_hollow.svg'
import { ReactComponent as NotiHollowIcon } from 'assets/icons/noti_hollow.svg'
import { ReactComponent as NotiActiveIcon } from 'assets/icons/noti_active.svg'
import { ReactComponent as DefaultBanner } from 'assets/images/default_banner.svg'
import { ReactComponent as DefaultAvatar } from 'assets/images/default_avatar.svg'

// import api
import { getUserData } from 'api/users'
import { addFollowing, removeFollowing } from 'api/followship'
import { getUserFollowings } from 'api/users'

export const OtherUser = () => {
  const [noti, setNoti] = useState(false)
  const { setFollowTab } = useContext(TabContext)
  const navigate = useNavigate()

  // 取得當前使用者ID
  const id = JSON.parse(localStorage.getItem("userInfo")).id

  // 取得使用者ID
  const otherUserId = Number(localStorage.getItem("otherUserId"))
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [avatar, setAvatar] = useState('')
  const [banner, setBanner] = useState('')
  const [followingsCount, setFollowingsCount] = useState('')
  const [followersCount, setFollowersCount] = useState('')
  const [tweetsCount, setTweetsCount] = useState('')
  const [introduction, setIntroduction] = useState('')

  // 設置當前使用者的追蹤狀態
  const [isFollowing, setIsFollowing] = useState()

  // 取得使用者資料
  useEffect(() => async () => {
    const getUserDataAsync = async () => {
      try {
        const data = await getUserData(otherUserId)
        // 儲存使用者資料
        setName(data.name)
        setAccount(data.account)
        setAvatar(data.avatar)
        setBanner(data.banner)
        setFollowersCount(data.followersCount)
        setFollowingsCount(data.followingsCount)
        setTweetsCount(data.tweetsCount)
        setIntroduction(data.introduction)
      } catch (error) {
        console.error(error)
      }
    }

    const checkIsFollowing = async () => {
      try {
        const followings = await getUserFollowings(id)
        const followingIdArray = followings.map(following => following.followingId)
        if(followingIdArray.includes(otherUserId)) {
          setIsFollowing(true)
        } else {
          setIsFollowing(false)
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkIsFollowing()
    getUserDataAsync()
  }, [])  

  // 串接
  const handleFollow = async () => {
    try {
      if(isFollowing === true) {
        const res = await removeFollowing(otherUserId)
        setIsFollowing(false)
        console.log(res.data)
      } else if(isFollowing === false) {
        const res = await addFollowing(otherUserId)
        setIsFollowing(true)
        console.log(res.data)
      }
    } catch(err) {
      console.log(err)
    }
  }

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
            <img src={banner ? banner : <DefaultBanner />} alt="coverImage" />
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
              {isFollowing ? 
                <button 
                  onClick={() => {
                    handleFollow()
                  }}
                  className="following"
                >
                  {isFollowing ? '正在跟隨' : '跟隨'}
                </button>
                :
                <button 
                  onClick={() => {
                    handleFollow()
                  }}
                  className="follow"
                >
                  {isFollowing ? '正在跟隨' : '跟隨'}
                </button>
              }
            </div>
            <div className="avatarBox">
              <img className="avatar" src={avatar ? avatar : <DefaultAvatar />} alt="avatar" />
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
      <OtherTab />
    </div>
  )
}