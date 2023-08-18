import './HomePage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { Tweets } from "components/Tweets/Tweets";
import { Recommendation } from 'components/Recommendation/Recommendation';

import { useContext } from 'react';
import { ModalContext } from 'context/ModalContext';

export const HomePage = () => {
  const { showModal } = useContext(ModalContext)

  return (
    <div className="homepageContainer">
      {showModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <Tweets />
      <Recommendation />
    </div>
  );
};