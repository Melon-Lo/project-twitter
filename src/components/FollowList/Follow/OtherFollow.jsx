import './OtherFollow.scss'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

// import API
import { getUserFollowings } from 'api/users'
import { addFollowing, removeFollowing } from 'api/followship'

export const OtherFollow = ({
  avatar,
  description,
  name,
  id,
  // 先拿追蹤者／追隨者的id，之後做使用
  followId,
}) => {
  const [following, setFollowing] = useState(false)

  // 取得當前使用者ID
  const selfId = JSON.parse(localStorage.getItem("userInfo")).id

  // 設置當前使用者的追蹤狀態
  const [isFollowing, setIsFollowing] = useState()

  useEffect(() => async () => {
    const checkIsFollowing = async () => {
      const followings = await getUserFollowings(selfId)
      const followingsIdArray = followings.map(following => following.followingId)
      if(followingsIdArray.includes(followId)) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false)
      }
    }

    checkIsFollowing()
  }, [])

  // 串接
  const handleFollow = async () => {
    try {
      if(isFollowing === true) {
        const res = await removeFollowing(followId)
        setIsFollowing(false)
        // console.log(res.data)
      } else if(isFollowing === false) {
        const res = await addFollowing(followId)
        setIsFollowing(true)
        // console.log(res.data)
      }
    } catch(err) {
      console.log(err)
    }
  } 

  return (
    <div className="otherFollowItem" key={id}>
      <div className="name">{name}</div>
      <div className="content">{description}</div>
      <div className="avatarBox">
        <img src={avatar} alt="loading" />
      </div>
      {isFollowing ?
        <button 
          onClick={handleFollow}
          className="following"
        >
          {isFollowing ? '正在跟隨' : '跟隨'}
        </button>
        :
        <button 
          onClick={handleFollow}
          className="follow"
        >
          {isFollowing ? '正在跟隨' : '跟隨'}
        </button>
      }
    </div>
  )
}