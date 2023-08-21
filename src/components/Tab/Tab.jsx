import './Tab.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { TabContext } from 'context/TabContext'

// import components
import { Tweet, IconInfo } from 'components/Tweet/Tweet'
import { Reply } from 'components/Reply/Reply'

const UserTweet = () => {
  const { setShowReplyModal } = useContext(ModalContext)
  return (
    <>
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
    </>
  )
}

const UserReply = () => {
  return (
    <>
      <Reply />
      <Reply />
      <Reply />
      <Reply />
    </>
  )
}

const UserLike = () => {
  const { setShowReplyModal } = useContext(ModalContext)
  return (
    <>
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
      <Tweet children={<IconInfo setShowReplyModal={setShowReplyModal} />} />
    </>
  ) 
}

export const Tab = () => {
  const { tab, setTab } = useContext(TabContext)

  return (
    <div className="tabContainer">
      <div className="selectionBar">
        <div className={tab === 'tweet' ? 'optionActive' : 'option'} onClick={() => setTab('tweet')}>推文</div>
        <div className={tab === 'reply' ? 'optionActive' : 'option'} onClick={() => setTab('reply')}>回覆</div>
        <div className={tab === 'like' ? 'optionActive' : 'option'} onClick={() => setTab('like')}>喜歡的內容</div>
      </div>
      <div className="content">
        {tab === 'tweet' && <UserTweet />}
        {tab === 'reply' && <UserReply />}
        {tab === 'like' && <UserLike />}
      </div>
    </div>
  )
}