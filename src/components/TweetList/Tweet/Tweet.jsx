import './Tweet.scss'

// import dependencies
import { useNavigate } from 'react-router-dom'

// import icons
import { ReactComponent as ChatHollowIcon } from 'assets/icons/chat_hollow.svg'
import { ReactComponent as LikeHollowIcon } from 'assets/icons/like_hollow.svg'

// tweet types

export const IconInfo = ({ setShowReplyModal, likeCount, replyCount }) => {
  const navigate = useNavigate()

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

export const Tweet = ({ children, id, name, account, description, avatar, createdAt }) => {
  const navigate = useNavigate()

  return (
    <div className="tweetItem" key={id}>
      <div className="avatarBox" onClick={() => navigate('/user/other')}>
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <div className="tweetInfo">
        <div className="topInfo">
          <div className="name">{name}</div>
          <div className="account">@{account}</div>
          <div className="time">．{createdAt}</div>
        </div>
        <div className="tweetContent" onClick={() => navigate('/reply_list')}>{description}</div>
        {children}
      </div>
    </div>
  )
}