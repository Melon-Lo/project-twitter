import './FollowList.scss'

// import components
import { FollowTab } from 'components/Tab/Tab'
import { Link, useNavigate } from 'react-router-dom'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'

export const FollowList = () => {
  const navigate = useNavigate()

  return (
    <div className="followListContainer">
      <div className="topSection">
        <div className="title">
          <Link to="/user/self">
            <div className="iconBox" onClick={() => navigate('/user/self')}>
              <BackIcon />
            </div>
          </Link>
          <div className="titleContent">
            <div className="name">Liz</div>
            <div className="tweets">45 推文</div>
          </div>
        </div>
      </div>
      <FollowTab />
    </div>
  )
}