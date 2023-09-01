import './RecommendationList.scss'

import { useState, useEffect } from 'react'
import { Recommendation } from './Recommendation'

// API
import { getTop10Users } from 'api/users'

export const RecommendationList = () => {
  // 存放users
  const [users, setUsers] = useState([])

  // 使用API拿資料
  useEffect(() => async () => {
    const getTop10UsersAsync = async () => {
      try {
        const users = await getTop10Users()
        if(users) {
          setUsers(users.map((user) => ({ ...user })))
        } else {
          setUsers([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    getTop10UsersAsync()
  }, [])

  return (
    <div className="recommendationContainer">
      <div className="title">推薦跟隨</div>
      <div className="people">
        {users.length !== 0 ?
          (users.map((user) => {
            const { id, name, avatar, Followers, account } = user
            return (
              <Recommendation 
                key={id}
                id={id}
                name={name}
                avatar={avatar}
                account={account}
                Followers={Followers}
              />
            )
          }))
        : 
        <div className='loading'>
          Loading...  
        </div>}
      </div>
    </div>
  )
}