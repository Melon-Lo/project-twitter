import './UserPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { User } from 'components/User/User';
import { RecommendationList } from 'components/RecommendationList/RecommendationList';
import { useContext } from 'react';
import { ModalContext } from 'context/ModalContext';

export const UserPage = () => {
  const { showModal } = useContext(ModalContext)

  return (
    <div className="userPageContainer">
      {showModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <User />
      <RecommendationList />
    </div>
  )
};