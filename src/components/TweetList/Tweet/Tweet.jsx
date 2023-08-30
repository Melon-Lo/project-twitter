import './Tweet.scss'

// import dependencies
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContext } from 'context/PageContext'

// import icons
import { ReactComponent as ChatHollowIcon } from 'assets/icons/chat_hollow.svg'
import { ReactComponent as LikeHollowIcon } from 'assets/icons/like_hollow.svg'
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg'

// tweet types

// api
import { addLike, removeLike } from 'api/like'

export const IconInfo = ({ setShowReplyModal, id, name, account, avatar, description,createdAt, isLiked, likeCount, replyCount }) => {
  const navigate = useNavigate()

  const [ like, setLike ] = useState(isLiked)

  const handleLike = async () => {
    try{
      const Token = localStorage.getItem("authToken");
      let data = []
      if( like === true ){
        data = await removeLike(Token, id)
      }else{
        data = await addLike(Token, id)
      }
      setLike(data.isLiked)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="iconInfo">
      <div className="comments">
        <div className="iconBox" onClick={() => {
          setShowReplyModal(true)
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
          {like ? 
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

  const selfId = JSON.parse(localStorage.getItem("userInfo")).id
  const clikcedUserId = UserId

  function checkUser() {
    if(selfId === clikcedUserId) {
      localStorage.setItem("otherUserId", clikcedUserId)
      setUser("self")
      navigate("/user/self")
    } else {
      localStorage.setItem("otherUserId", clikcedUserId)
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
        <div className="tweetContent" onClick={() => navigate('/reply_list', {state: { id, name, account, description, avatar, isLiked }})}>{description}</div>
        {children}
      </div>
    </div>
  )
}