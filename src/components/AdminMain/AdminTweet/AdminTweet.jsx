import './AdminTweet.scss'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'

export const TweetTitle = ({ title }) => {
  return <h2 className='TweetTitle'>{title}</h2>
}

// TweetItem 子元件
export const AdminTweetItem = () => {
  return (
    <div className="AdminTweetItem">
      <div className="avatarBox">
        <img className="avatar" src="https://www.pokemongoplusplus.com/img/img-2.jpg" alt="avatar" />
      </div>
      <div className="tweetText">
        <div className="topText">
          <div className="infoText">
            <div className="name">Chris</div>
            <div className="account">@Anna</div>
            <div className="time">·3小時</div>
          </div>
          <div className='closeBox'>
            <CloseIcon className='close' />
          </div>
        </div>
        <div className="tweetContent">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
        </div>
      </div>
    </div>
  )
}

// TweetList 父元件
export const AdminTweetList = () => {
  return (
    <div className='TweetListWrapper'>
      <TweetTitle title="推特清單" />
      <div className='TweetListContent'>
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
      </div>
    </div>
  )
}
