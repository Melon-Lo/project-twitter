import './OtherFollowList.scss'

// import components
import { OtherFollowTab } from 'components/Tab/OtherTab'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { PageContext } from 'context/PageContext'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'

// API
import { getUserData } from 'api/users'

export const OtherFollowList = () => {
  const navigate = useNavigate()

  // 儲存別人資料空間
  const [name, setName] = useState('')
  const [tweetsCount, setTweetsCount] = useState('')

  // 儲存別人資料
  const otherUserId = localStorage.getItem("otherUserId")

  // 取得使用者資料
  useEffect(() => async () => {
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

    getOtherUserDataAsync()
  }, [])

  return (
    <div className="otherFollowListContainer">
      <div className="topSection">
        <div className="title">
          <Link to="/user/self">
            <div className="iconBox" onClick={() => {
              navigate('/user/other')
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
      <OtherFollowTab />
    </div>
  )
}