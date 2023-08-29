import './User.scss'

// import dependencies
import { useContext, useEffect, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router-dom'
import { TabContext } from 'context/TabContext'
import { PageContext } from 'context/PageContext'

// import components
import { EditModal } from 'components/Modal/EditModal'
import { Tab } from 'components/Tab/Tab'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'

// import api
import { getUserData } from 'api/users'

export const User = () => {
  const { showModal, setShowModal } = useContext(ModalContext)
  const { setFollowTab } = useContext(TabContext)
  const { setUser } = useContext(PageContext)
  const navigate = useNavigate()

  // 儲存資料空間
  const { id, introduction } = JSON.parse(localStorage.getItem("userInfo"))
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [avatar, setAvatar] = useState('')
  const [banner, setBanner] = useState('')
  const [followingsCount, setFollowingsCount] = useState('')
  const [followersCount, setFollowersCount] = useState('')
  const [tweetsCount, setTweetsCount] = useState('')

  // 取得使用者資料
  useEffect(() => async () => {
    setUser("self")
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
        {showModal &&
          <EditModal avatar={avatar} banner={banner}/>
        }
        <div className="userBox">
          <div className="coverBox">
            <img src={banner} alt="coverImage" />
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
                  {followingsCount}個
                </b>
                  追蹤中
              </div>
              <div className="follower">
                <b onClick={() => {
                  setFollowTab('follower')
                  navigate('follower')
                }}>
                  {followersCount}個
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