import './AdminMainPage.scss'
import { AdminSideBar } from "components/AdminMain/AdminSideBar/AdminSideBar";
import { AdminTweetList } from "components/AdminMain/AdminTweet/AdminTweet";


export const AdminMainPage = () => {
  return (
    <div className="adminMainWrapper">
      <div className="adminMainContainer">
        <AdminSideBar />
        <AdminTweetList />
      </div>
    </div>
  )
};