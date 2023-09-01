import './OtherFollowPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { OtherFollowList } from 'components/FollowList/OtherFollowList';
import { RecommendationList } from 'components/RecommendationList/RecommendationList';

export const OtherFollowPage = () => {
  return (
    <div className="otherFollowPageContainer">
      <SideBar />
      <OtherFollowList />
      <RecommendationList />
    </div>
  )
}