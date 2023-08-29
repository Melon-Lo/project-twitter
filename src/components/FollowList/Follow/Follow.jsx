import './Follow.scss'

import { useState } from 'react'
import clsx from 'clsx'

// import api
import { getUserFollowings } from 'api/users'

export const Follow = () => {
  const [following, setFollowing] = useState(false)

  return (
    <div className="followItem">
      <div className="name">Melody</div>
      <div className="content">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </div>
      <div className="avatarBox">
        <img src="https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-02-768x768.png" alt="avatar" />
      </div>
      <button className={clsx('follow', { following: following })} onClick={() => setFollowing(!following)}>
        {following ? '正在跟隨' : '跟隨'}
      </button>
    </div>
  )
}