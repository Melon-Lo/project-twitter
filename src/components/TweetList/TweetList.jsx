import './TweetList.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

// import components
import { Tweet, IconInfo } from 'components/TweetList/Tweet/Tweet'
import { Modal } from 'components/Modal/Modal'
import { useNavigate } from 'react-router-dom'

export const TweetList = ({ tweets }) => {
  const { showModal, setShowModal, showReplyModal, setShowReplyModal } = useContext(ModalContext)
  const navigate = useNavigate()

  // 取得大頭貼
  const avatar = JSON.parse(localStorage.getItem("userInfo")).avatar

  return (
    <div className="tweetListContainer">
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
          <div className="avatarBox"><img className="avatar" src={avatar} alt="avatar" /></div>
          <div className="addTweetContent" onClick={() => {
            setShowModal(true)
            navigate('tweet')
          }}>
            有什麼新鮮事？
          </div>
          <button className="submitButton">
            推文
          </button>
        </div>
      </div>
      <div className="bottomSection">
        {tweets.lengh !== 0 ? 
          (tweets.map((tweet) => {
            let { name, account, avatar } = tweet.User
            const { id, UserId, createdAt, description, likeCount, replyCount, updatedAt } = tweet
            return (
              <Tweet 
                children={
                <IconInfo 
                  setShowReplyModal={setShowReplyModal}
                  likeCount={likeCount}
                  replyCount={replyCount}
                />
                }
                key={id}
                id={id}
                UserId={UserId}
                name={name}
                account={account}
                description={description}
                createdAt={createdAt}
                avatar={avatar}
                updatedAt={updatedAt}
              />
            )
          }))
          : '尚未發佈任何貼文'}
      </div>
    </div>
  )
}