import './FollowList.scss'

// import components
import { FollowTab } from 'components/Tab/Tab'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { PageContext } from 'context/PageContext'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'

// API
import { getUserData } from 'api/users'

export const FollowList = () => {
  const navigate = useNavigate()
  const { user } = useContext(PageContext)

  // 儲存自己資料空間
  const { id } = JSON.parse(localStorage.getItem("userInfo"))
  const [name, setName] = useState('')
  const [tweetsCount, setTweetsCount] = useState('')

  // 儲存別人資料
  const otherUserId = localStorage.getItem("otherUserId")

  // 取得使用者資料
  useEffect(() => async () => {
    // 如果使用者是自己
    const getUserDataAsync = async () => {
      try {
        const data = await getUserData(id)
        setName(data.name)
        setTweetsCount(data.tweetsCount)
      } catch (error) {
        console.error(error)
      }
    }

    // 如果使用者是別人
    const getOtherUserDataAsync = async () => {
      try {
        const data = await getUserData(otherUserId)
        setName(data.name)
        setTweetsCount(data.tweetsCount)
      } catch (error) {
        console.error(error)
      }
    }

    if(user === 'self') {
      getUserDataAsync()
    } else {
      getOtherUserDataAsync()
    }
  }, [])

  return (
    <div className="followListContainer">
      <div className="topSection">
        <div className="title">
          <Link to="/user/self">
            <div className="iconBox" onClick={() => {
              if(user === 'self') {
                navigate('/user/self')
              } else {
                navigate('/user/other')
              }      
            }}>
              <BackIcon />
            </div>
          </Link>
          <div className="titleContent">
            <div className="name">{name}</div>
            <div className="tweets">{tweetsCount} 推文</div>
          </div>
        </div>
      </div>
      <FollowTab />
    </div>
  )
}