import './Follow.scss'

import { useState } from 'react'
import clsx from 'clsx'

export const Follow = ({
  avatar,
  description,
  name,
  id,
  // 先拿追蹤者／追隨者的id，之後做使用
  followId,
}) => {
  const [following, setFollowing] = useState(false)

  return (
    <div className="followItem" key={id}>
      <div className="name">{name}</div>
      <div className="content">{description}</div>
      <div className="avatarBox">
        <img src={avatar} alt="avatar" />
      </div>
      <button className={clsx('follow', { following: following })} onClick={() => setFollowing(!following)}>
        {following ? '正在跟隨' : '跟隨'}
      </button>
    </div>
  )
}