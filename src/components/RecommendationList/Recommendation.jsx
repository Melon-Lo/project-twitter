import './Recommendation.scss'

import { useState } from 'react'
import clsx from 'clsx'

import { addFollowing } from 'api/followship'
import { removeFollowing } from 'api/followship'

export const Recommendation = ({recommendation}) => {
  const [following, setFollowing] = useState(false)
  const [id, setId] = useState(recommendation.id)

  const followship = async () => {
    try{
      const Token = localStorage.getItem("authToken");
      let data = []
      if(following === true){
        data = await removeFollowing(Token,id)
        console.log(data)
      }else{
        data = await addFollowing(Token,id)
        console.log(data)
      }
      setFollowing(data.isFollowed)
      // 因為現在是假資料，畫面並不會保留真實的狀態(有無追蹤)
      // 如果按追蹤然後重整畫面，useState會將狀態又改為fasle，導致判斷一直進else進而呼叫追蹤API，就會出現「您已追蹤過此用戶」的錯誤
      // 可以先使用下面這個將資料跟畫面改回同步的狀態喔
      // setFollowing(!following)
    }catch(err){
      console.log(err) 
    }
  }

  return (
    <div className="person">
      <div className="avatarBox"><img className="avatar" src="https://www.nintendo.tw/img/og_nintendo.png" alt="avatar" /></div>
      <div className="account">
        <div className="accountTitle">Nintendo</div>
        <div className="accountContent">@Nintendo</div>
      </div>
      {/* <button className={clsx('follow', { following: following })} onClick={() => setFollowing(!following)}> */}
      <button className={clsx('follow', { following: following })} onClick={followship}>
        {following ? '正在跟隨' : '跟隨'}
      </button>
    </div>
  )
}