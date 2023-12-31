import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage';
import { ReplyListPage } from 'pages/ReplyListPage/ReplyListPage';
import { UserPage } from 'pages/UserPage/UserPage';
import { FollowPage } from 'pages/FollowPage/FollowPage';
import { OtherUserPage } from 'pages/OtherUserPage/OtherUserPage';
import { OtherFollowPage } from 'pages/OtherFollowPage/OtherFollowPage';
import { AdminLoginPage } from 'pages/AdminLoginPage/AdminLoginPage';
import { AdminMainPage } from 'pages/AdminMainPage/AdminMainPage';
import { AdminUserPage } from 'pages/AdminUserPage/AdminUserPage'
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { SettingPage } from 'pages/SettingPage/SettingPage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';
import { HomePage } from 'pages/HomePage/HomePage';

// import contexts
import ModalContextProvider from 'context/ModalContext';
import TabContextProvider from 'context/TabContext';
import PageContextProvider from 'context/PageContext';
import AuthContextProvider from 'context/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageContextProvider>
          <ModalContextProvider>
          <TabContextProvider>
            <AuthContextProvider>
              <Routes>
                <Route path="login" element={<LoginPage />}></Route>
                <Route path="admin-login" element={<AdminLoginPage />}></Route>
                <Route path="signup" element={<SignUpPage />}></Route>
                <Route path="setting" element={<SettingPage />}></Route>
                <Route path="user/self" element={<UserPage />}></Route>
                <Route path="user/self/edit" element={<UserPage />}></Route>
                <Route path="user/self/follower" element={<FollowPage />}></Route>
                <Route path="user/self/following" element={<FollowPage />}></Route>
                <Route path="user/other" element={<OtherUserPage />}></Route>
                <Route path="user/other/follower" element={<OtherFollowPage />}></Route>
                <Route path="user/other/following" element={<OtherFollowPage />}></Route>
                <Route path="admin_main" element={<AdminMainPage />}></Route>
                <Route path="admin_users" element={<AdminUserPage />}></Route>
                <Route path="reply_list" element={<ReplyListPage />}></Route>
                <Route path="reply_list/reply_modal" element={<ReplyListPage />}></Route>
                <Route path="main" element={<MainPage />}></Route>
                <Route path="main/tweet" element={<MainPage />}></Route>
                <Route path="main/reply_modal" element={<MainPage />}></Route>
                <Route path="main/reply_modal" element={<MainPage />}></Route>
                <Route path="home" element={<HomePage />}></Route>
                <Route path="*" element={<Navigate to="home" />} />
              </Routes>
            </AuthContextProvider> 
          </TabContextProvider>
        </ModalContextProvider>
        </PageContextProvider>   
      </BrowserRouter>
    </div>
  );
}

export default App;
