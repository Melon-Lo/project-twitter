import './Reply.scss'

import { useNavigate, useLocation } from 'react-router-dom'

export const Reply = ({ reply }) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { id, UserId, comment, createdAt, poster } = reply
  const { account, name, avatar } = reply.User

  const clickedUserId = UserId
  const selfId = localStorage.getItem("userInfo").id

  return (
    <div className="reply" key={id}>
      <div className="replyLeft">
        <img 
          className="avatar" 
          src={avatar} 
          alt="loading" 
          onClick={() => {
            if(pathname === '/main' || pathname === '/reply_list') {
              localStorage.setItem("otherUserId", UserId)
              if(selfId === clickedUserId) {
                navigate('/user/self')
              } else {
                navigate('/user/other')   
              } 
            }
          }}
        />
      </div>
      <div className="replyRight">
        <div className="data">
          <div className="name">{name}</div>
          <div className="account">@{account}</div>
          <div className="time">．{createdAt}</div>
        </div>
        <div className="replyTo">回覆<b> @{poster}</b></div>
        <div className="content">{comment}</div>
      </div>
    </div>
  )
}