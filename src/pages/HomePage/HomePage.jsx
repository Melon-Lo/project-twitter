import './HomePage.scss'
import { SideBar } from "components/SideBar/SideBar";
import { Tweets } from "components/Tweets/Tweets";

export const HomePage = () => {
  return (
    <div className="homepageContainer">
      <SideBar />
      <Tweets />
    </div>
  );
};