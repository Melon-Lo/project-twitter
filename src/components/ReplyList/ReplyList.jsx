import './ReplyList.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router'

// import components
import { ReplyModal } from 'components/Modal/ReplyModal'
import { Reply } from 'components/ReplyList/Reply/Reply'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'
import { ReactComponent as ReplyIcon } from 'assets/icons/reply.svg'
import { ReactComponent as LikeHollowIcon } from 'assets/icons/like_hollow.svg'


export const ReplyList = () => {
  const navigate = useNavigate()
  const { showReplyModal, setShowReplyModal } = useContext(ModalContext)

  return (
    <div className="replyContainer">
      <div className="topSection">
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
              <img className="avatar" src="https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-02-768x768.png" alt="avatar" />
            </div>
            <div className="info">
              <div className="name">Chris</div>
              <div className="account">@chris</div>
            </div>
          </div>
          <div className="tweetMiddle">
            <div className="content">今天天氣真好</div>
            <div className="time">上午11:00．2023年8月19日</div>
          </div>
          <div className="tweetBottom">
            <div className="dataCount">
              <div className="count"><b>13</b>回覆</div>
              <div className="count"><b>99</b>喜歡次數</div>
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
        <Reply />
        <Reply />
        <Reply />
        <Reply />
      </div>
    </div>
  )
}