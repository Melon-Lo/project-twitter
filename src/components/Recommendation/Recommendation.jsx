import './Recommendation.scss'

export const Recommendation = () => {
  return (
    <div className="recommendationContainer">
      <div className="title">推薦跟隨</div>
      <div className="people">
        <div className="person">
          <div className="avatarBox"><img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" /></div>
          <div className="account">
            <div className="accountTitle">Nintendo</div>
            <div className="accountContent">@Nintendo</div>
          </div>
          <button className="followButton">
            跟隨
          </button>
        </div>
      </div>
    </div>
  )
}