import './Modal.scss'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import closeIcon from 'assets/icons/close@2x.png'
import { Tweet, ReplyInfo } from 'components/Tweet/Tweet'
import { useLocation } from 'react-router-dom'

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
      <img className="closeIcon" src={closeIcon} alt="closeIcon"/>
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
          <CloseIcon />
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