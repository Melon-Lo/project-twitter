import './OtherUserPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { OtherUser } from 'components/User/OtherUser';
import { Recommendation } from 'components/Recommendation/Recommendation';
import { useContext, useEffect } from 'react';
import { ModalContext } from 'context/ModalContext';
import { PageContext } from 'context/PageContext';

export const OtherUserPage = () => {
  const { showModal } = useContext(ModalContext)
  const { setPage } = useContext(PageContext)

  useEffect(() => {
    setPage('user')
  }, [])

  return (
    <div className="otherUserPageContainer">
      {showModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <OtherUser />
      <Recommendation />
    </div>
  )
};