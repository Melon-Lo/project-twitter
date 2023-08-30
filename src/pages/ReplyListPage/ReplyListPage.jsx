import './ReplyListPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { RecommendationList } from 'components/RecommendationList/RecommendationList';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from 'context/ModalContext';
import { ReplyList } from 'components/ReplyList/ReplyList';

import { getReplies, getTweet } from 'api/tweets';
import { useLocation } from 'react-router-dom';

export const ReplyListPage = () => {
  const { showReplyModal } = useContext(ModalContext)
  
  const location = useLocation()
  const { id, name, account, avatar, isLiked } = location.state
  const [ tweet, setTweet ] = useState({
    isLiked: isLiked,
    User:{
      account: account,
      avatar: avatar,
      name: name
    }
  })
  const [ replies, setReplies ] = useState([])

  useEffect(() => async () => {
    try {
      const tweet = await getTweet(id)
      setTweet({...tweet})
      const replies = await getReplies(id)
      setReplies(replies.map(reply => ({
        ...reply
      })))
    } catch (err) {
      console.error(err)
    }
  })

  return (
    <div className="replyListPageContainer">
      {showReplyModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <ReplyList tweet={tweet} replies={replies}/>
      <RecommendationList />
    </div>
  )
}