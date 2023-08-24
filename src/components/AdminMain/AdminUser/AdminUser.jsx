import './AdminUser.scss'
import { ReactComponent as FollowIcon } from 'assets/icons/write.svg'
import { ReactComponent as LikeIcon } from 'assets/icons/like_hollow.svg'
import { TweetTitle } from '../AdminTweet/AdminTweet'

// CardItem 子元件
export const CardItem = () => {
  return (
    <div className='card'>
      <div className="backGroundImg">
      </div>
      <div className="avatarSection">
        <div className="avatarBox">
          <img className='avatar' src="https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.webp?b=1&s=612x612&w=0&k=20&c=VsTsa0kjyZ7ALe-nyKAUfynyRxZo8H4LRMdu_ecPuOY=" alt="" />
        </div>
        <div className="avatarName">
          <div className='name'>John Doe</div>
          <div className='hashName'>@heyjohn</div>
        </div>
      </div>
      <div className="iconSection">
        <div className="iconGroup">
          <div className="iconBox">
            <FollowIcon className='icon' />
          </div>
          <span className="iconNum">
            1.5K
          </span>
        </div>
        <div className="iconGroup">
          <div className="iconBox">
            <LikeIcon className='icon' />
          </div>
          <span className="iconNum">
            20K
          </span>
        </div>
      </div>
      <div className="followSection">
        <div className="followGroup">
          <span className="followNum">34個</span>
          <span className="folloerNum">跟隨中</span>
        </div>
        <div className="followGroup">
          <span className="followNum">59</span>
          <span className="folloerNum">跟隨者</span>
        </div>
      </div>
    </div>
  )
}

// CardList 父元件
export const CardList = () => {
  return (
    <div className="cardListWrapper">
      <TweetTitle title="使用者列表" />
      <div className="cardListContent">
        <div className="cardListContainer">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </div>
    </div>
  )
}