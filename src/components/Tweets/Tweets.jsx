import './Tweets.scss'
import ChatIcon from 'assets/icons/Chat_2@2x.png'
import LikeIcon from 'assets/icons/like_2@2x.png'

export const Tweets = () => {
  return (
    <div className="tweetsContainer">
      <div className="topSection">
        <p className="title">首頁</p>
        <div className="AddTweetBox">
          <div className="avatarBox"><img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" /></div>
          <div className="addTweetContent">有什麼新鮮事？</div>
          <button className="submitButton">
            推文
          </button>
        </div>
      </div>
      <div className="bottomSection">
        <div className="tweetsBox">
          <div className="tweetItem">
            <div className="avatarBox"><img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" /></div>
            <div className="tweetInfo">
              <div className="topInfo">
                <div className="name">Anna</div>
                <div className="account">@Anna</div>
                <div className="time">·三小時</div>
              </div>
              <div className="tweetContent">今天天氣真好</div>
              <div className="bottomInfo">
                <div className="comments"><img className="icon" src={ChatIcon} alt="chatIcon" />13</div>
                <div className="likes"><img className="icon" src={LikeIcon} alt="LikeIcon" />99</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}