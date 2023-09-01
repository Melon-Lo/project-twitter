import './MainPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { TweetList } from "components/TweetList/TweetList";
import { RecommendationList } from 'components/RecommendationList/RecommendationList';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from 'context/ModalContext';
import { useNavigate } from 'react-router-dom';

// API
import { getAllTweets } from 'api/tweets';
import { AuthContext } from 'context/AuthContext';

export const MainPage = () => {
  // 存放tweets
  const [tweets, setTweets] = useState([])
  const { showModal, showReplyModal } = useContext(ModalContext)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  
  let userInfo = {}
  let role = ""
  if (localStorage.getItem("userInfo")) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"))
    role = userInfo.role

  } 

  useEffect = (() => async () => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getAllTweets()
        setTweets(tweets.map((tweet) => ({ ...tweet })))
      } catch (error) {
        console.error(error)
      }
    }

      if( role === "user") {
        getTweetsAsync()
      } else if (role === "admin") {
        navigate("/admin_main")
      } else {
        navigate("/login")
      }

  }, [])

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