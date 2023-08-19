import './ReplyList.scss'
import BackIcon from 'assets/icons/back@2x.png'
import ReplyIcon from 'assets/icons/reply@2x.png'
import LikeIcon from 'assets/icons/like_2@2x.png'
import { useNavigate } from 'react-router'

const Reply = () => {
  return (
    <div className="reply">
      <div className="replyLeft">
        <img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" />
      </div>
      <div className="replyRight">
        <div className="data">
          <div className="name">Andy</div>
          <div className="account">@andy</div>
          <div className="time">．3小時</div>
        </div>
        <div className="replyTo">回覆<b> @Apple</b></div>
        <div className="content">沒錯，每天都要加油！</div>
      </div>
    </div>
  )
}

export const ReplyList = () => {
  const navigate = useNavigate()

  return (
    <div className="replyContainer">
      <div className="topSection">
        <div className="title">
          <div className="iconBox" onClick={() => {
            navigate('/main')
          }}>
            <img className="icon" src={BackIcon} alt="backIcon" />
          </div>
          <p>推文</p>
        </div>
        <div className="tweet">
          <div className="tweetTop">
            <div className="avatarBox">
              <img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" />
            </div>
            <div className="info">
              <div className="name">Apple</div>
              <div className="account">@apple</div>
            </div>
          </div>
          <div className="tweetMiddle">
            <div className="content">今天要加油哦！</div>
            <div className="time">上午11:00．2023年8月19日</div>
          </div>
          <div className="tweetBottom">
            <div className="dataCount">
              <div className="count"><b>34</b>回覆</div>
              <div className="count"><b>808</b>喜歡次數</div>
            </div>
            <div className="iconSection">
              <div className="iconBox">
                <img className="icon" src={ReplyIcon} alt="replyIcon" />
              </div>
              <div className="iconBox">
                <img className="icon" src={LikeIcon} alt="likeIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomSection">
        <Reply />
      </div>
    </div>
  )
}