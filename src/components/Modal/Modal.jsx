import './Modal.scss'

// import dependencies
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

// import components
import { Tweet, ReplyInfo } from 'components/TweetList/Tweet/Tweet'

// import icons
import { ReactComponent as Close } from 'assets/icons/close.svg'

const CloseIcon = () => {
  const path = useLocation().pathname
  let toPath = ''

  if (path === '/main/tweet' || path === '/main/reply_modal') {
    toPath = '/main'
  } else if (path === '/reply_list/reply_modal') {
    toPath = '/reply_list'
  }

  return (
    <Link to={toPath}>
      <Close className='closeIcon' />
    </Link>
  )
}

export const Modal = ({ placeholder, buttonContext, showModal, setShowModal, showReplyModal, setShowReplyModal, type }) => {
  const checkModalType = ()  => {
    if(type === 'post') {
      setShowModal(false)
    } else if(type === 'reply')
      setShowReplyModal(false)
  }

  return (
    <div className={clsx('', {postModalBox: showModal, replyModalBox: showReplyModal })}>
      <div className="topBar">
        <div className="iconBox" onClick={() => checkModalType()}>
          <CloseIcon onClick={() => checkModalType()}/>
        </div>
      </div>
      {showReplyModal &&
        <Tweet children={<ReplyInfo />} />
      }
      <div className="modalAvatarBox">
        <img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" />
      </div>
      <textarea className="addTweetContent" type="text" placeholder={placeholder}></textarea>
      <button className="submitButton">
        {buttonContext}
      </button>
    </div>
  )
}