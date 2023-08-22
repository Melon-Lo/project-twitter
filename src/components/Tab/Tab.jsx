import './Tab.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { TabContext } from 'context/TabContext'
import { useNavigate } from 'react-router-dom'

// import components
import { Tweet, IconInfo } from 'components/TweetList/Tweet/Tweet'
import { Reply } from 'components/ReplyList/Reply/Reply'
import { Follow } from 'components/FollowList/Follow/Follow'

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

export const FollowTab = () => {
  const { followTab, setFollowTab } = useContext(TabContext)
  const navigate = useNavigate()

  return (
    <div className="tabContainer">
      <div className="selectionBar">
        <div 
          className={followTab === 'follower' ? 'optionActive' : 'option'} 
          onClick={() => {
            setFollowTab('follower')
            navigate('/user/self/follower')
          }}
        >
          追隨者
        </div>
        <div 
          className={followTab === 'following' ? 'optionActive' : 'option'} 
          onClick={() => {
            setFollowTab('following')
            navigate('/user/self/following')
          }}
        >
          正在追隨
        </div>
      </div>
      <div className="content">
        {followTab === 'follower' && <Follow />}
        {followTab === 'following' && <Follow />}
      </div>
    </div>
  )
}

