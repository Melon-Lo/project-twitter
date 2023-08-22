import './Reply.scss'

export const Reply = () => {
  return (
    <div className="reply">
      <div className="replyLeft">
        <img className="avatar" src="https://marketplace.canva.com/EAFltIh8PKg/1/0/1600w/canva-cute-anime-cartoon-illustration-girl-avatar-J7nVyTlhTAE.jpg" alt="avatar" />
      </div>
      <div className="replyRight">
        <div className="data">
          <div className="name">Anna</div>
          <div className="account">@anna</div>
          <div className="time">．3小時</div>
        </div>
        <div className="replyTo">回覆<b> @chris</b></div>
        <div className="content">沒錯，每天都要加油！</div>
      </div>
    </div>
  )
}