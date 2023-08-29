import './TweetList.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

// import components
import { Tweet, IconInfo } from 'components/TweetList/Tweet/Tweet'
import { Modal } from 'components/Modal/Modal'
import { ReplyModal } from 'components/Modal/ReplyModal'
import { useNavigate } from 'react-router-dom'

export const TweetList = ({ tweets }) => {
  const { showModal, setShowModal, showReplyModal, setShowReplyModal } = useContext(ModalContext)
  const navigate = useNavigate()

  // 取得大頭貼
  const avatar = JSON.parse(localStorage.getItem("userInfo")).avatar

  // 貼文模式
  const addTweet = () => {
    setShowModal(true)
    navigate('tweet')
  }

  return (
    <div className="tweetListContainer">
      <div className="topSection">
        <p className="title">首頁</p>
        {showModal &&
          <Modal 
            setShowModal={setShowModal}
          />
        }
        {showReplyModal &&
          <ReplyModal
            setShowReplyModal={setShowReplyModal} 
          />
        }
        <div className="AddTweetBox">
          <div className="avatarBox"><img className="avatar" src={avatar} alt="avatar" /></div>
          <div className="addTweetContent" onClick={addTweet}>
            有什麼新鮮事？
          </div>
          <button className="submitButton" onClick={addTweet}>
            推文
          </button>
        </div>
      </div>
      <div className="bottomSection">
        {tweets.length !== 0 ? 
          (tweets.map((tweet) => {
            const { name, account, avatar } = tweet.User
            const { id, UserId, createdAt, description, likeCount, replyCount, updatedAt, Likes } = tweet
           
            const user = JSON.parse(localStorage.getItem("userInfo")).id
            let isLiked = false
            Likes.map(like=>{
              return like.userId === user && like.tweetId === id  ? isLiked = true : isLiked
            })
            
            return (
              <Tweet 
                children={
                  <IconInfo
                    setShowReplyModal={setShowReplyModal}
                    id={id}
                    isLiked={isLiked}
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