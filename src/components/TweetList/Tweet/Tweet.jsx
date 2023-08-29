import './Tweet.scss'

// import dependencies
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContext } from 'context/PageContext'

// import icons
import { ReactComponent as ChatHollowIcon } from 'assets/icons/chat_hollow.svg'
import { ReactComponent as LikeHollowIcon } from 'assets/icons/like_hollow.svg'

// tweet types

export const IconInfo = ({ setShowReplyModal, likeCount, replyCount }) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(PageContext)

  return (
    <div className="iconInfo">
      <div className="comments">
        <div className="iconBox" onClick={() => {
          setShowReplyModal(true)
          navigate('reply_modal') 
        }}>
          <ChatHollowIcon className="icon" />
        </div>
        <div className="number">
          {replyCount}
        </div>
      </div>
      <div className="likes">
        <div className="iconBox">
          <LikeHollowIcon className="icon" />
        </div>
        <div className="number">
          {likeCount}
        </div>
      </div>
    </div>
  )
}

export const ReplyInfo = () => {
  return (
    <div className="replyInfo">
      <div className="replyTo">回覆給<b>@Mitsubishi</b></div>
    </div>
  )
}

export const Tweet = ({ children, id, name, account, description, avatar, createdAt, UserId }) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(PageContext)

  const selfId = JSON.parse(localStorage.getItem("userInfo")).id
  const clikcedUserId = UserId

  function checkUser() {
    if(selfId === clikcedUserId) {
      localStorage.setItem("otherUserId", clikcedUserId)
      setUser("self")
      navigate("/user/self")
    } else {
      localStorage.setItem("otherUserId", clikcedUserId)
      setUser("other")
      navigate("/user/other")
    }
  }

  return (
    <div className="tweetItem" key={id}>
      <div className="avatarBox" onClick={checkUser}>
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <div className="tweetInfo">
        <div className="topInfo">
          <div className="name">{name}</div>
          <div className="account">@{account}</div>
          <div className="time">．{createdAt}</div>
        </div>
        <div className="tweetContent" onClick={() => navigate('/reply_list', {state: { id }})}>{description}</div>
        {children}
      </div>
    </div>
  )
}