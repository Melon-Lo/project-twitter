import './Recommendation.scss'

import { useState } from 'react'
import clsx from 'clsx'

export const Recommendation = () => {
  const [following, setFollowing] = useState(false)

  return (
    <div className="person">
      <div className="avatarBox"><img className="avatar" src="https://www.nintendo.tw/img/og_nintendo.png" alt="avatar" /></div>
      <div className="account">
        <div className="accountTitle">Nintendo</div>
        <div className="accountContent">@Nintendo</div>
      </div>
      <button className={clsx('follow', { following: following })} onClick={() => setFollowing(!following)}>
        {following ? '正在跟隨' : '跟隨'}
      </button>
    </div>
  )
}