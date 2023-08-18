import './Tweet.scss'
import ChatIcon from 'assets/icons/Chat_2@2x.png'
import LikeIcon from 'assets/icons/like_2@2x.png'
import { Link } from 'react-router-dom'

// tweet types

export const IconInfo = ({ setShowReplyModal }) => {
  return (
    <div className="iconInfo">
      <div className="comments">
        <Link to="reply_modal">
          <div className="iconBox" onClick={() => setShowReplyModal(true)}>
            <img className="icon" src={ChatIcon} alt="chatIcon" />
          </div>
        </Link>
        <div className="number">
          13
        </div>
      </div>
      <div className="likes">
        <div className="iconBox">
          <img className="icon" src={LikeIcon} alt="LikeIcon" />
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
  return (
    <div className="tweetItem">
      <div className="avatarBox"><img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" /></div>
      <div className="tweetInfo">
        <div className="topInfo">
          <div className="name">Anna</div>
          <div className="account">@Anna</div>
          <div className="time">·3小時</div>
        </div>
        <div className="tweetContent">今天天氣真好</div>
        {children}
      </div>
    </div>
  )
}