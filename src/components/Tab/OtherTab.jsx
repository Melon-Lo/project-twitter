import './OtherTab.scss'

// import dependencies
import { useState, useEffect, useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { TabContext } from 'context/TabContext'
import { useNavigate } from 'react-router-dom'
import { PageContext } from 'context/PageContext'

// import components
import { Tweet, IconInfo } from 'components/TweetList/Tweet/Tweet'
import { Reply } from 'components/ReplyList/Reply/Reply'
import { Follow } from 'components/FollowList/Follow/Follow'

// API
import { getUserFollowers, getUserFollowings } from 'api/users'
import { getUserTweets, getUserReplies, getUserLikes } from 'api/tweets'

const UserTweet = ({ tweets }) => {
  const { setShowReplyModal } = useContext(ModalContext)
  return (
    <>
      {tweets.length !== 0 ? 
        (tweets.map((tweet) => {
          const { id, createdAt, description, replyCount, likeCount, updatedAt, LikeUsers } = tweet
          const { name, account, avatar } = tweet.User
          return (
            <Tweet 
              children={
              <IconInfo 
                setShowReplyModal={setShowReplyModal}
                likeCount={likeCount}
                replyCount={replyCount}
                LikeUsers={LikeUsers}
              />
              }
              key={id}
              id={id}
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
    </>
  )
}

const UserReply = ({ replies }) => {
  return (
    <>
      {replies.length !== 0 ? 
        (replies.map((reply) => {
          return (
            <Reply key={reply.id} reply={reply} />
          )
        }))
      : '尚未發佈任何回覆'}
    </>
  )
}

const UserLike = ({ tweets }) => {
  const { setShowReplyModal } = useContext(ModalContext)
  return (
    <>
      {tweets.length !== 0 ? 
        (tweets.map((tweet) => {
          const { id, createdAt, description, repliesCount, likeCount, updatedAt, name, account, avatar, LikeUsers } = tweet
          return (
            <Tweet 
              children={
              <IconInfo 
                setShowReplyModal={setShowReplyModal}
                likeCount={repliesCount}
                replyCount={likeCount}
                LikeUsers={LikeUsers}
              />
              }
              key={id}
              id={id}
              name={name}
              account={account}
              description={description}
              createdAt={createdAt}
              avatar={avatar}
              updatedAt={updatedAt}
            />
          )
        }))
        : '尚未喜歡任何貼文'}
    </>
  )
}

export const OtherTab = () => {
  // 先把別人的id拿出來
  const otherUserId = localStorage.getItem("otherUserId")

  // 存放tweets
  const [tweets, setTweets] = useState([])
  // 存放replies
  const [replies, setReplies] = useState([])
  // 存放likedTweets
  const [likedTweets, setLikedTweets] = useState([])

  const { tab, setTab } = useContext(TabContext)

  // 使用API拿資料
  useEffect(() => {
    // 別人所有的貼文
    const getOtherUserTweetsAsync = async () => {
      try {
        const tweets = await getUserTweets(otherUserId)
        if (tweets) {
          setTweets(tweets.map((tweet) => ({ ...tweet })))
        } else {
          setTweets([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    // 別人所有的回覆
    const getOtherUserRepliesAsync = async () => {
      try {
        const replies = await getUserReplies(otherUserId)
        if(replies) {
          setReplies(replies.map((reply) => ({ ...reply })))
        } else {
          setReplies([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    // 別人所有喜歡的貼文
    const getOtherUserLikesAsync = async () => {
      try {
        const likedTweets = await getUserLikes(otherUserId)
        if(likedTweets) {
          // console.log(likedTweets)
          setLikedTweets(likedTweets.map((likedTweet) => ({ ...likedTweet })))
        } else {
          setLikedTweets([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    getOtherUserTweetsAsync()
    getOtherUserRepliesAsync()
    getOtherUserLikesAsync()
  }, [])



  return (
    <div className="tabContainer">
      <div className="selectionBar">
        <div className={tab === 'tweet' ? 'optionActive' : 'option'} onClick={() => {
          setTab('tweet')
        }}>推文</div>
        <div className={tab === 'reply' ? 'optionActive' : 'option'} onClick={() => setTab('reply')}>回覆</div>
        <div className={tab === 'like' ? 'optionActive' : 'option'} onClick={() => setTab('like')}>喜歡的內容</div>
      </div>
      <div className="content">
        {tab === 'tweet' && <UserTweet tweets={tweets} />}
        {tab === 'reply' && <UserReply replies={replies}/>}
        {tab === 'like' && <UserLike tweets={likedTweets}/>}
      </div>
    </div>
  )
}