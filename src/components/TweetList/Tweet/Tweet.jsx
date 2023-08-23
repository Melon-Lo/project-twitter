import './Tweet.scss'

// import dependencies
import { useNavigate } from 'react-router-dom'

// import icons
import { ReactComponent as ChatHollowIcon } from 'assets/icons/chat_hollow.svg'
import { ReactComponent as LikeHollowIcon } from 'assets/icons/like_hollow.svg'


// tweet types

export const IconInfo = ({ setShowReplyModal }) => {
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
          13
        </div>
      </div>
      <div className="likes">
        <div className="iconBox">
          <LikeHollowIcon className="icon" />
        </div>
        <div className="number">
          99
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

export const Tweet = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className="tweetItem">
      <div className="avatarBox" onClick={() => navigate('/user/other')}>
        <img className="avatar" src="https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-02-768x768.png" alt="avatar" />
      </div>
      <div className="tweetInfo">
        <div className="topInfo">
          <div className="name">Chris</div>
          <div className="account">@Anna</div>
          <div className="time">·3小時</div>
        </div>
        <div className="tweetContent" onClick={() => navigate('/reply_list')}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </div>
        {children}
      </div>
    </div>
  )
}