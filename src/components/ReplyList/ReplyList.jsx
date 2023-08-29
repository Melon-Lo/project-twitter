import './ReplyList.scss'

// import dependencies
import { useContext, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router'

// import components
import { ReplyModal } from 'components/Modal/ReplyModal'
import { Reply } from 'components/ReplyList/Reply/Reply'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'
import { ReactComponent as ReplyIcon } from 'assets/icons/reply.svg'
import { ReactComponent as LikeHollowIcon } from 'assets/icons/like_hollow.svg'

export const ReplyList = (props) => {
  const navigate = useNavigate()
  const { showReplyModal, setShowReplyModal } = useContext(ModalContext)

  const { id, description, absoluteTime, likeCount, replyCount, User } = props.tweet
  const { account, avatar, name } = User

  const replies = props.replies.map(reply => {
    return <Reply key={reply.id} reply={reply} />
  })

  return (
    <div className="replyContainer">
      <div className="topSection" key={id}>
        <div className="title">
          <div className="iconBox" onClick={() => navigate('/main')}>
            <BackIcon />
          </div>
          <p>推文</p>
        </div>
        {showReplyModal &&
          <ReplyModal
            setShowReplyModal={setShowReplyModal} 
          />
        }
        <div className="tweet">
          <div className="tweetTop">
            <div className="avatarBox">
              <img className="avatar" src={avatar} alt="avatar" />
            </div>
            <div className="info">
              <div className="name">{name}</div>
              <div className="account">@{account}</div>
            </div>
          </div>
          <div className="tweetMiddle">
            <div className="content">{description}</div>
            <div className="time">{absoluteTime}</div>
          </div>
          <div className="tweetBottom">
            <div className="dataCount">
              <div className="count"><b>{replyCount}</b>回覆</div>
              <div className="count"><b>{likeCount}</b>喜歡次數</div>
            </div>
            <div className="iconSection">
              <div className="iconBox" onClick={() => {
                setShowReplyModal(true)
                navigate('reply_modal')
              }}>
                <ReplyIcon />
              </div>
              <div className="iconBox">
                <LikeHollowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomSection">
        {replies}
      </div>
    </div>
  )
}