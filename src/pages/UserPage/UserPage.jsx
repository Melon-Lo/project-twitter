import './UserPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { User } from 'components/User/User';
import { Follow } from 'components/Follow/Follow';
import { Recommendation } from 'components/Recommendation/Recommendation';
import { useState, useContext } from 'react';
import { ModalContext } from 'context/ModalContext';

export const UserPage = () => {
  const { showModal } = useContext(ModalContext)
  const [section, setSection] = useState('user')

  return (
    <div className="userPageContainer">
      {showModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      {section === 'user' && <User setSection={setSection} />}
      {section === 'follow' && <Follow />}
      <Recommendation />
    </div>
  )
};