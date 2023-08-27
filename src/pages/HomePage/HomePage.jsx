import './HomePage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { Tweets } from "components/TweetList/TweetList";
import { Recommendation } from 'components/Recommendation/Recommendation';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from 'context/ModalContext';

// API
import { getAllTweets } from 'api/tweets';

export const HomePage = () => {
  // 存放tweets
  const [tweets, setTweets] = useState([])

  const { showModal, showReplyModal } = useContext(ModalContext)

  useEffect(() => async () => {
    try {
      const tweets = await getAllTweets()
      setTweets(tweets.map((tweet) => ({ ...tweet })))
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="homePageContainer">
      {showModal &&
        <div className="grayBackground"></div>
      }
      {showReplyModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <Tweets tweets={tweets}/>
      <Recommendation />
    </div>
  );
};