import './Tweets.scss'
import ChatIcon from 'assets/icons/Chat_2@2x.png'
import LikeIcon from 'assets/icons/like_2@2x.png'
import closeIcon from 'assets/icons/close@2x.png'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

// tweet types

const IconInfo = ({ setShowReplyModal }) => {
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

const ReplyInfo = () => {
  return (
    <div className="replyInfo">
      <div className="replyTo">回覆給<b>@Mitsubishi</b></div>
    </div>
  )
}

const Tweet = ({ children }) => {
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

// modal types

const Modal = ({ placeholder, buttonContext, showModal, setShowModal, showReplyModal, setShowReplyModal, type }) => {

  return (
    <div className={clsx('', {postModalBox: showModal, replyModalBox: showReplyModal })}>
      <div className="topBar">
        <div className="iconBox" onClick={() =>{
          if(type === 'post') {
            setShowModal(false)
          } else if(type === 'reply')
            setShowReplyModal(false)
          }
        }>
          <Link to="/main">
            <img className="closeIcon" src={closeIcon} alt="closeIcon"/>
          </Link>
        </div>
      </div>
      {showReplyModal &&
        <Tweet children={<ReplyInfo />} />
      }
      <div className="avatarBox"><img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" /></div>
      <textarea className="addTweetContent" type="text" placeholder={placeholder}></textarea>
      <button className="submitButton">
        {buttonContext}
      </button>
    </div>
  )
}

// main layout

export const Tweets = () => {
  const { showModal, setShowModal, showReplyModal, setShowReplyModal } = useContext(ModalContext)

  return (
    <div className="tweetsContainer">
      <div className="topSection">
        <p className="title">首頁</p>
        {showReplyModal &&
          <Modal 
            type={'reply'}
            placeholder={'推你的回覆'} 
            buttonContext={'回覆'}
            showReplyModal={showReplyModal} 
            setShowReplyModal={setShowReplyModal} 
          />
        }
        {showModal &&
          <Modal 
            type={'post'}
            placeholder={'有什麼新鮮事？'} 
            buttonContext={'推文'} 
            showModal={showModal}
            setShowModal={setShowModal}
          />
        }
        <div className="AddTweetBox">
          <div className="avatarBox"><img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" /></div>
          <Link to="tweet" className="link">
            <div className="addTweetContent" onClick={() => setShowModal(true)}>有什麼新鮮事？</div>
          </Link>
          <button className="submitButton">
            推文
          </button>
        </div>
      </div>
      <div className="bottomSection">
        <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
        <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
        <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
        <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
      </div>
    </div>
  )
}