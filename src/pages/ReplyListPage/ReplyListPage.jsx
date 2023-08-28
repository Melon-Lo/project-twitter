import './ReplyListPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { RecommendationList } from 'components/RecommendationList/RecommendationList';
import { useContext } from 'react';
import { ModalContext } from 'context/ModalContext';
import { ReplyList } from 'components/ReplyList/ReplyList';

export const ReplyListPage = () => {
  const { showReplyModal } = useContext(ModalContext)
  return (
    <div className="replyListPageContainer">
      {showReplyModal &&
        <div className="grayBackground"></div>
      }
      <SideBar />
      <ReplyList />
      <RecommendationList />
    </div>
  )
}