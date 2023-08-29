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
  
  const tweetId = useLocation()
  const [ tweet, setTweet ] = useState({
    id:'',
    description:'',
    absoluteTime:'',
    likeCount: 0,
    replyCount: 0,
    User:{
      account: '',
      avatar: '',
      name: ''
    }
  })
  const [ replies, setReplies ] = useState([])

  useEffect(() => async () => {
    try {
      const { id } = tweetId.state
      const tweet = await getTweet(id)
      setTweet(tweet)
      const replies = await getReplies(id)
      setReplies(replies.map(reply => ({
        ...reply
      })))
    } catch (err) {
      console.error(err)
    }
  },[])

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