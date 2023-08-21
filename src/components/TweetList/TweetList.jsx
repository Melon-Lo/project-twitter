import './TweetList.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

// import components
import { Tweet, IconInfo } from 'components/Tweet/Tweet'
import { Modal } from 'components/Modal/Modal'
import { Link } from 'react-router-dom'

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
          <Link to="tweet">
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