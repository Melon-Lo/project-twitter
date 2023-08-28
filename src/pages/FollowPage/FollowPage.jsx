import './FollowPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { FollowList } from 'components/FollowList/FollowList';
import { RecommendationList } from 'components/RecommendationList/RecommendationList';

export const FollowPage = () => {
  return (
    <div className="followPageContainer">
      <SideBar />
      <FollowList />
      <RecommendationList />
    </div>
  )
}