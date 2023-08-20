import './ReplyList.scss'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import BackIcon from 'assets/icons/back@2x.png'
import ReplyIcon from 'assets/icons/reply@2x.png'
import LikeIcon from 'assets/icons/like_2@2x.png'
import { useNavigate } from 'react-router'
import { Modal } from 'components/Modal/Modal'
import { Link } from 'react-router-dom'
import { Reply } from 'components/Reply/Reply'

export const ReplyList = () => {
  const navigate = useNavigate()
  const { showReplyModal, setShowReplyModal } = useContext(ModalContext)

  return (
    <div className="replyContainer">
      <div className="topSection">
        <div className="title">
          <div className="iconBox" onClick={() => navigate('/home')}>
            <img className="icon" src={BackIcon} alt="backIcon" />
          </div>
          <p>推文</p>
        </div>
        {showReplyModal &&
          <Modal 
            type={'reply'}
            placeholder={'推你的回覆'} 
            buttonContext={'回覆'}
            showReplyModal={showReplyModal} 
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
              <Link to="reply_modal">
                <div className="iconBox" onClick={() => setShowReplyModal(true)}>
                  <img className="icon" src={ReplyIcon} alt="replyIcon" />
                </div>
              </Link>
              
              <div className="iconBox">
                <img className="icon" src={LikeIcon} alt="likeIcon" />
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