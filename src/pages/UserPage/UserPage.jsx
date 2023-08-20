import './UserPage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { User } from 'components/User/User';
import { Recommendation } from 'components/Recommendation/Recommendation';

export const UserPage = () => {
  return (
    <div className="userPageContainer">
      <SideBar />
      <User />
      <Recommendation />
    </div>
  )
};