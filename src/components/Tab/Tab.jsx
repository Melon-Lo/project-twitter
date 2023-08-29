import './Tab.scss'

// import dependencies
import { useState, useEffect, useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { TabContext } from 'context/TabContext'
import { useNavigate } from 'react-router-dom'

// import components
import { Tweet, IconInfo } from 'components/TweetList/Tweet/Tweet'
import { Reply } from 'components/ReplyList/Reply/Reply'
import { Follow } from 'components/FollowList/Follow/Follow'
import { getUserTweets, getUserReplies, getUserLikes } from 'api/tweets'

const UserTweet = ({ tweets }) => {
  const { setShowReplyModal } = useContext(ModalContext)
  return (
    <>
      {tweets.length !== 0 ? 
        (tweets.map((tweet) => {
          const { id, createdAt, description, RepliesCount, LikeCount, updatedAt } = tweet
          return (
            <Tweet 
              children={
              <IconInfo 
                setShowReplyModal={setShowReplyModal}
                likeCount={RepliesCount}
                replyCount={LikeCount}
              />
              }
              key={id}
              id={id}
              // name={name}
              // account={account}
              description={description}
              createdAt={createdAt}
              // avatar={avatar}
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
          const { id, createdAt, description, RepliesCount, LikeCount, updatedAt } = tweet
          return (
            <Tweet 
              children={
              <IconInfo 
                setShowReplyModal={setShowReplyModal}
                likeCount={RepliesCount}
                replyCount={LikeCount}
              />
              }
              key={id}
              id={id}
              // name={name}
              // account={account}
              description={description}
              createdAt={createdAt}
              // avatar={avatar}
              updatedAt={updatedAt}
            />
          )
        }))
        : '尚未喜歡任何貼文'}
    </>
  )
}

export const Tab = () => {
  // 存放tweets
  const [tweets, setTweets] = useState([])
  // 存放replies
  const [replies, setReplies] = useState([])
  // 存放likedTweets
  const [likedTweets, setLikedTweets] = useState([])

  const { tab, setTab } = useContext(TabContext)

  // 使用API拿資料
  useEffect(() => {
    // 自己所有的貼文
    const getUserTweetsAsync = async () => {
      try {
        const tweets = await getUserTweets(savedUserInfoId)
        if (tweets) {
          setTweets(tweets.map((tweet) => ({ ...tweet })))
        } else {
          setTweets([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    // 自己所有的回覆
    const getUserRepliesAsync = async () => {
      try {
        const replies = await getUserReplies(savedUserInfoId)
        if(replies) {
          setReplies(replies.map((reply) => ({ ...reply })))
        } else {
          setReplies([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    // 自己所有喜歡的貼文
    const getUserLikesAsync = async () => {
      try {
        const likedTweets = await getUserLikes(savedUserInfoId)
        if(likedTweets) {
          console.log(likedTweets)
          setLikedTweets(likedTweets.map((likedTweet) => ({ ...likedTweet })))
        } else {
          setLikedTweets([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    // 執行
    getUserTweetsAsync()
    getUserRepliesAsync()
    getUserLikesAsync()
  }, [])

  // 從localStorage拿當前使用者的資料
  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserInfoId = savedUserInfo.id

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

