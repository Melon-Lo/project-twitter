import './ReplyListPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { Recommendation } from 'components/Recommendation/Recommendation';
import { useContext } from 'react';
import { ModalContext } from 'context/ModalContext';

export const ReplyListPage = () => {
  const { showReplyModal } = useContext(ModalContext)
  return (
    <div className="replyListPageContainer">
      {showReplyModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <Recommendation />
    </div>
  )
}