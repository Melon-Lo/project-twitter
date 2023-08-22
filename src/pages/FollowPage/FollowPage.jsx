import './FollowPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { FollowList } from 'components/FollowList/FollowList';
import { Recommendation } from 'components/Recommendation/Recommendation';

export const FollowPage = () => {
  return (
    <div className="followPageContainer">
      <SideBar />
      <FollowList />
      <Recommendation />
    </div>
  )
}