import './HomePage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { Tweets } from "components/TweetList/TweetList";
import { Recommendation } from 'components/Recommendation/Recommendation';
import { useContext } from 'react';
import { ModalContext } from 'context/ModalContext';

export const HomePage = () => {
  const { showModal, showReplyModal } = useContext(ModalContext)

  return (
    <div className="homePageContainer">
      {showModal &&
        <div className="grayBackground"></div>
      }
      {showReplyModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <Tweets />
      <Recommendation />
    </div>
  );
};