import './AdminUserPage.scss'
import { AdminSideBar } from 'components/AdminMain/AdminSideBar/AdminSideBar';
import { CardList } from 'components/AdminMain/AdminUser/AdminUser';

export const AdminUserPage = () => {
  return  (
    <div className="adminUserWrapper">
      <div className="adminUserContainer">
        <AdminSideBar />
        <CardList />
      </div>
    </div>
  
  )
};