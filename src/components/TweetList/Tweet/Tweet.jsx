import './Tweet.scss'

// import dependencies
import { useContext,useEffect,useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PageContext } from 'context/PageContext'
import { ModalContext } from 'context/ModalContext'

// import icons
import { ReactComponent as ChatHollowIcon } from 'assets/icons/chat_hollow.svg'
import { ReactComponent as LikeHollowIcon } from 'assets/icons/like_hollow.svg'
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg'

// api
import { addLike, removeLike } from 'api/like'
import { TabContext } from 'context/TabContext'

export const IconInfo = ({ setShowReplyModal, id, name, account, avatar, description, createdAt, isLiked, likeCount, replyCount, LikeUsers }) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { showReplyModal } = useContext(ModalContext)
  const { tab } = useContext(TabContext)
  const selfId = JSON.parse(localStorage.getItem("userInfo")).id
  const otherId = localStorage.getItem("otherUserId")

  const [liked, setLiked] = useState(false)
  
  useEffect(() => {
    if(tab === 'tweet') {
      const idArray = LikeUsers.map(LikeUser => LikeUser.id)
      if(pathname === '/user/self') {
          if(idArray.includes(selfId)) {
          setLiked(true)
        }
      } else if(pathname === '/user/other') {
          if(idArray.includes(otherId)) {
          setLiked(true)
        }
      }
    } else if(tab === 'like') {
      setLiked(true)
    }
  }, [])

  const [like, setLike] = useState(isLiked)

  const handleLike = async () => {
    try {
      const Token = localStorage.getItem("authToken");
      let data = []
      if(like === true) {
        data = await removeLike(Token, id)
      } else {
        data = await addLike(Token, id)
      }
      setLike(data.isLiked)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="iconInfo" onClick={() => console.log(liked)}>
      <div className="comments">
        <div className="iconBox" onClick={() => {
          setShowReplyModal(true)
          console.log(showReplyModal)
          if(pathname === '/user/self') {
            navigate('reply_list/reply_modal')
            return
          }
          navigate('reply_modal',{state: { id, name, account, avatar, description, createdAt }}) 
        }}>
          <ChatHollowIcon className="icon" />
        </div>
        <div className="number">
          {replyCount}
        </div>
      </div>
      <div className="likes" onClick={handleLike}>
        <div className="iconBox" >
          {liked ? 
            <LikeIcon className="likeIcon" /> : 
            <LikeHollowIcon className="icon" />}
        </div>
        <div className="number">
          {likeCount}
        </div>
      </div>
    </div>
  )
}

export const ReplyInfo = ({ account }) => {
  return (
    <div className="replyInfo">
      <div className="replyTo">回覆給<b>@{account}</b></div>
    </div>
  )
}

export const Tweet = ({ children, id, name, account, description, avatar, createdAt, UserId, isLiked }) => {
  const navigate = useNavigate()

  const { setUser } = useContext(PageContext)
  const { showReplyModal } = useContext

  const selfId = JSON.parse(localStorage.getItem("userInfo")).id
  const clickedUserId = UserId

  function checkUser() {
    if(selfId === clickedUserId) {
      localStorage.setItem("otherUserId", clickedUserId)
      setUser("self")
      navigate("/user/self")
    } else {
      localStorage.setItem("otherUserId", clickedUserId)
      setUser("other")
      navigate("/user/other")
    }
  }

  return (
    <div className="tweetItem" key={id}>
      <div className="avatarBox" onClick={checkUser}>
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <div className="tweetInfo">
        <div className="topInfo">
          <div className="name">{name}</div>
          <div className="account">@{account}</div>
          <div className="time">．{createdAt}</div>
        </div>
        {showReplyModal ?
          // 如果是ReplyModal裡面的Tweet，不能被點擊
          <div className="replyTweetContent" >
            {description}
          </div> :
          <div 
            className="tweetContent" 
            onClick={() => navigate('/reply_list', {state: { id, name, account, description, avatar, isLiked }})}
          >
            {description}
          </div>
        }
        {children}
      </div>
    </div>
  )
}