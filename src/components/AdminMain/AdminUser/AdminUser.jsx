import './AdminUser.scss'
import { ReactComponent as FollowIcon } from 'assets/icons/write.svg'
import { ReactComponent as LikeIcon } from 'assets/icons/like_hollow.svg'
import { TweetTitle } from '../AdminTweet/AdminTweet'
import { useState, useEffect } from 'react' 
import { getAllUsersAdmin } from 'api/tweets'
// const defaultAvatar = "https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.webp?b=1&s=612x612&w=0&k=20&c=VsTsa0kjyZ7ALe-nyKAUfynyRxZo8H4LRMdu_ecPuOY="

import avatarDefulat from 'assets/images/default.png'

// CardItem 子元件
export const CardItem = ({ 
  avatar, 
  name,
  account, 
  tweetCount,
  likesCount,
  followingsCount,
  followersCount,
}) => {


  return (
    <div className='card'>
      <div className="backGroundImg">
      </div>
      <div className="avatarSection">
        <div className="avatarBox">
          <img className='avatar' src={avatar ? avatar : avatarDefulat} alt="使用者大頭貼" />
        </div>
        <div className="avatarName">
          <div className='name'>{name}</div>
          <div className='hashName'>@{account}</div>
        </div>
      </div>
      <div className="iconSection">
        <div className="iconGroup">
          <div className="iconBox">
            <FollowIcon className='icon' />
          </div>
          <span className="iconNum">
            {tweetCount}k
          </span>
        </div>
        <div className="iconGroup">
          <div className="iconBox">
            <LikeIcon className='icon' />
          </div>
          <span className="iconNum">
            {likesCount}k
          </span>
        </div>
      </div>
      <div className="followSection">
        <div className="followGroup">
          <span className="followNum">{followingsCount}個</span>
          <span className="folloerNum">跟隨中</span>
        </div>
        <div className="followGroup">
          <span className="followNum">{followersCount}位</span>
          <span className="folloerNum">跟隨者</span>
        </div>
      </div>
    </div>
  )
}

// CardList 父元件
export const CardList = () => {

  const [users, setUsers] = useState([])

  // 透過API獲取使用者資料
  useEffect(() => {
    const getAllUsersAdminAsync = async () => {

      try {
        const datas = await getAllUsersAdmin()
        setUsers(datas.map((data) => ({ ...data })))

        // console.log('setUser後的值', datas)

      } catch (error) {
        console.error(error)
      }
    }
    getAllUsersAdminAsync()
  },[])
    
 

  return (
    <div className="cardListWrapper">
      <TweetTitle title="使用者列表" />
      <div className="cardListContent">
        <div className="cardListContainer">
          {users.map((user) => (
            <CardItem 
              key={user.id}
              avatar={user.avatar}
              name={user.name}
              account={user.account}
              tweetCount={user.Tweets}
              likesCount={user.LikeTweets}
              followingsCount={user.Followings}
              followersCount={user.Followers}
            />
          ))}
        </div>
      </div>
    </div>
  )
}