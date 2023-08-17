import './HomePage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { Tweets } from "components/Tweets/Tweets";
import { Recommendation } from 'components/Recommendation/Recommendation';

export const HomePage = () => {
  return (
    <div className="homepageContainer">
      <SideBar />
      <Tweets />
      <Recommendation />
    </div>
  );
};