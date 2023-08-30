import './AdminTweet.scss'
import { useState, useEffect } from 'react'
import { getAllTweetsAdmin } from 'api/tweets'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'

export const TweetTitle = ({ title }) => {
  return <h2 className='TweetTitle'>{title}</h2>
}

// TweetItem 子元件
export const AdminTweetItem = ({ 
  name,
  account,
  time,
  content
 }) => {
  return (
    <div className="AdminTweetItem">
      <div className="avatarBox">
        <img className="avatar" src="https://www.pokemongoplusplus.com/img/img-2.jpg" alt="avatar" />
      </div>
      <div className="tweetText">
        <div className="topText">
          <div className="infoText">
            <div className="name">{name}</div>
            <div className="smallText">
              <span className="account">@{account}</span>
              <span className="time">·{time}</span>
            </div>
          </div>
          <div className='closeBox'>
            <CloseIcon className='close' />
          </div>
        </div>
        <div className="tweetContent">
          {content} 
        </div>
      </div>
    </div>
  )
}

// TweetList 父元件
export const AdminTweetList = () => {
  const [tweets, setTweets] = useState([])

  

  useEffect(() => {
    const getAllTweetsAdminAsync = async () => {
      try {
        const datas = await getAllTweetsAdmin()
        setTweets(datas.map((data) => ({...data})))
        console.log('setTweets後的值', datas)

      } catch(error) {
        console.error(error)
      }
    }
    getAllTweetsAdminAsync()
  },[])

  return (
    <div className='TweetListWrapper'>
      <TweetTitle title="推特清單" />
      <div className='TweetListContent'>
        {tweets.map((tweet) => (
          <AdminTweetItem 
            key={tweet.id}
            name={tweet.userName}
            account={tweet.userAccount}
            time={tweet.createdAt}
            content={tweet.description}
          />
        ))}
      </div>
    </div>
  )
}
