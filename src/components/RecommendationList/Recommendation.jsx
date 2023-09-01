import './Recommendation.scss'

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DefaultAvatar from 'assets/images/default_avatar.svg'
import { useNavigate } from 'react-router-dom'

// API
import { addFollowing, removeFollowing } from 'api/followship'

export const Recommendation = ({ id, name, avatar, account, Followers }) => {
  const navigate = useNavigate()

  // 取得當前使用者ID
  const selfId = JSON.parse(localStorage.getItem("userInfo")).id  

  // 設置當前使用者的追蹤狀態
  const [isFollowing, setIsFollowing] = useState()

  useEffect(() => async () => {
    const checkIsFollowing = async () => {
      const followingsIdArray = Followers.map(Follower => Follower.id)
      if(followingsIdArray.includes(selfId)) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false)
      }
    }

    checkIsFollowing()
  }, [])

  // 串接（取消）追蹤功能
  const handleFollow = async () => {
    if(selfId === id) {
      Swal.fire({
        position: 'top',
        title: '不能追蹤自己！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }

    try {
      if(isFollowing) {
        const res = await removeFollowing(id)
        setIsFollowing(false)
      } else if(!isFollowing) {
        const res = await addFollowing(id)
        setIsFollowing(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="person">
      <div className="avatarBox">
        <img className="avatar" src={avatar ? avatar : DefaultAvatar} alt="avatar" />
      </div>
      <div className="account">
        <div className="accountTitle">{name}</div>
        <div className="accountContent">@{account}</div>
      </div>
      <button 
        onClick={handleFollow}
        className={isFollowing ? 'following' : 'follow'}
      >
        {isFollowing ? '正在跟隨' : '跟隨'}
      </button>
    </div>
  )
}