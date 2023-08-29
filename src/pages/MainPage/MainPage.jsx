import './MainPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { TweetList } from "components/TweetList/TweetList";
import { RecommendationList } from 'components/RecommendationList/RecommendationList';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from 'context/ModalContext';

// API
import { getAllTweets } from 'api/tweets';

export const MainPage = () => {
  // 存放tweets
  const [tweets, setTweets] = useState([])

  const { showModal, showReplyModal } = useContext(ModalContext)

  useEffect(() => async () => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getAllTweets()
        setTweets(tweets.map((tweet) => ({ ...tweet })))
      } catch (error) {
        console.error(error)
      }
    }

    getTweetsAsync()
  })

  return (
    <div className="mainPageContainer">
      {showModal &&
        <div className="grayBackground"></div>
      }
      {showReplyModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <TweetList tweets={tweets}/>
      <RecommendationList />
    </div>
  );
};