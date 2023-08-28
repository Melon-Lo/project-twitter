import './Reply.scss'

export const Reply = ({ id, name, tweeterAccount, comment, avatar, createdAt, respondentAccount }) => {
  return (
    <div className="reply" key={id}>
      <div className="replyLeft">
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <div className="replyRight">
        <div className="data">
          <div className="name">{respondentAccount}</div>
          <div className="account">@{tweeterAccount}</div>
          <div className="time">．{createdAt}</div>
        </div>
        <div className="replyTo">回覆<b> @{name}</b></div>
        <div className="content">{comment}</div>
      </div>
    </div>
  )
}