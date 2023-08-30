import './Tab.scss'

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
          const { id, createdAt, description, replyCount, likeCount, updatedAt } = tweet
          const { name, account, avatar } = tweet.User
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
          const { id, createdAt, description, repliesCount, likeCount, updatedAt, name, account, avatar } = tweet
          return (
            <Tweet 
              children={
              <IconInfo 
                setShowReplyModal={setShowReplyModal}
                likeCount={repliesCount}
                replyCount={likeCount}
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

export const Tab = () => {
  // 從localStorage拿當前使用者的資料
  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const selfId = savedUserInfo.id

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
        const tweets = await getUserTweets(selfId)
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
        const replies = await getUserReplies(selfId)
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
        const likedTweets = await getUserLikes(selfId)
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

    getUserTweetsAsync()
    getUserRepliesAsync()
    getUserLikesAsync()    
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

export const FollowTab = () => {
  // 從localStorage拿當前使用者的資料
  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const selfId = savedUserInfo.id

  // 先把別人的id拿出來
  const otherUserId = localStorage.getItem("otherUserId")

  const { followTab, setFollowTab } = useContext(TabContext)
  const navigate = useNavigate()
  const { user } = useContext(PageContext)

  // 存放追蹤者和追隨者
  const [followings, setFollowings] = useState([])
  const [followers, setFollowers] = useState([])

  useEffect(() => async () => {
    // 拿到自己的追蹤者
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(selfId)
        setFollowings(followings.map((following) => ({ ...following })))
      } catch (error) {
        console.error(error)
      }
    }

    // 拿到自己的追隨者
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(selfId)
        setFollowers(followers.map((follower) => ({ ...follower })))
      } catch (error) {
        console.error(error)
      }
    }

    // 拿到別人的追蹤者
    const getOtherUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(otherUserId)
        setFollowings(followings.map((following) => ({ ...following })))
      } catch (error) {
        console.error(error)
      }
    }

    // 拿到別人的追隨者
    const getOtherUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(otherUserId)
        setFollowers(followers.map((follower) => ({ ...follower })))
      } catch (error) {
        console.error(error)
      }
    }

    if(user === 'self') {
      getUserFollowingsAsync()
      getUserFollowersAsync()
    } else if(user === 'other') {
      getOtherUserFollowersAsync()
      getOtherUserFollowingsAsync()
    }
  }, [])

  const Followings = () => {
    return (
      <>
        {followings.length !== 0 ? 
          (followings.map((following) => {
            const { followingAvatar, followingIntroduction, followingName, followingId, id } = following

            return (
              <Follow 
                id={id}
                avatar={followingAvatar}
                description={followingIntroduction}
                name={followingName}
                followId={followingId}
              />
            )
          }))
        : '尚未有任何的追蹤者'}
      </>
    )
  }

  const Followers = () => {
    return (
      <>
        {followers.length !== 0 ? 
          (followers.map((follower) => {
            const { followerAvatar, followerIntroduction, followerName, followerId, id } = follower

            return (
              <Follow 
                id={id}
                avatar={followerAvatar}
                description={followerIntroduction}
                name={followerName}
                followId={followerId}
              />
            )
          }))
        : '尚未有任何的追隨者'}
      </>
    )
  }

  return (
    <div className="tabContainer">
      <div className="selectionBar">
        <div 
          className={followTab === 'follower' ? 'optionActive' : 'option'} 
          onClick={() => {
            setFollowTab('follower')
            if(user === 'self') {
              navigate('/user/self/follower')
            } else {
              navigate('/user/other/follower')
            }
          }}
        >
          追隨者
        </div>
        <div 
          className={followTab === 'following' ? 'optionActive' : 'option'} 
          onClick={() => {
            setFollowTab('following')
            if(user === 'self') {
              navigate('/user/self/following')
            } else {
              navigate('/user/other/following')
            }
          }}
        >
          正在追隨
        </div>
      </div>
      <div className="content">
        {followTab === 'follower' && 
          <Followers />
        }
        {followTab === 'following' && 
          <Followings />}
      </div>
    </div>
  )
}