import './Reply.scss'

export const Reply = ({ reply }) => {
  const { id, comment, createdAt, poster } = reply
  const { account, name, avatar } = reply.User
  return (
    <div className="reply" key={id}>
      <div className="replyLeft">
        <img className="avatar" src={avatar} alt="avatar" />
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