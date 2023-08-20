import './User.scss'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { TabContext } from 'context/TabContext'
import BackIcon from 'assets/icons/back@2x.png'
import { Tweet, IconInfo } from 'components/Tweet/Tweet'
import { Reply } from 'components/Reply/Reply'
import clsx from 'clsx'

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

export const User = () => {
  const { tab, setTab } = useContext(TabContext)

  function getTabClassName() {
    
  }

  return (
    <div className="userContainer">
      <div className="topSection">
        <div className="title">
          <div className="iconBox">
            <img className="icon" src={BackIcon} alt="backIcon" />
          </div>
          <div className="titleContent">
            <div className="name">Liz</div>
            <div className="tweets">45 推文</div>
          </div>
        </div>
        <div className="userBox">
          <div className="coverBox">
            <img src="https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095_3x2.jpg" alt="coverImage" />
          </div>
          <div className="infoBox">
            <button>編輯個人資料</button>
            <div className="avatarBox">
              <img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" />
            </div>
            <div className="info">
              <div className="name">Liz</div>
              <div className="account">@liz</div>
              <div className="description">I am a beautiful girl.</div>
              <div className="countData">
              <div className="following">
                <b>10個</b>追蹤中
              </div>
              <div className="follower">
                <b>39位</b>追蹤者
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomSection">
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
    </div>
  )
}