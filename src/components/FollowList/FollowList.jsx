import './FollowList.scss'

// import components
import { FollowTab } from 'components/Tab/Tab'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'

// API
import { getUserData } from 'api/users'

export const FollowList = () => {
  const navigate = useNavigate()

  // 儲存自己資料空間
  const { id } = JSON.parse(localStorage.getItem("userInfo"))
  const [name, setName] = useState('')
  const [tweetsCount, setTweetsCount] = useState('')

  // 取得自己資料
  useEffect(() => async () => {
    const getUserDataAsync = async () => {
      try {
        const data = await getUserData(id)
        setName(data.name)
        setTweetsCount(data.tweetsCount)
      } catch (error) {
        console.error(error)
      }
    }

    getUserDataAsync()
  }, [])

  return (
    <div className="followListContainer">
      <div className="topSection">
        <div className="title">
          <Link to="/user/self">
            <div className="iconBox" onClick={() => {
              navigate('/user/self')
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