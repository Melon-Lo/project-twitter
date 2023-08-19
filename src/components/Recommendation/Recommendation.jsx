import './Recommendation.scss'

export const Recommendation = () => {
  return (
    <div className="recommendationContainer">
      <div className="title">推薦跟隨</div>
      <div className="people">
        <div className="person">
          <div className="avatarBox"><img className="avatar" src="https://www.nintendo.tw/img/og_nintendo.png" alt="avatar" /></div>
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