import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from 'pages/HomePage/HomePage';
import { ReplyListPage } from 'pages/ReplyListPage/ReplyListPage';
import { UserPage } from 'pages/UserPage/UserPage';
import { AdminLoginPage } from 'pages/AdminLoginPage/AdminLoginPage';
import { AdminPage } from 'pages/AdminPage/AdminPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { SettingPage } from 'pages/SettingPage/SettingPage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="admin-login" element={<AdminLoginPage />}></Route>
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="setting" element={<SettingPage />}></Route>
          <Route path="user/self" element={<UserPage />}></Route>
          <Route path="user/self/edit" element={<UserPage />}></Route>
          <Route path="user/self/follower" element={<UserPage />}></Route>
          <Route path="user/self/following" element={<UserPage />}></Route>
          <Route path="admin" element={<AdminPage />}></Route>
          <Route path="reply_list" element={<ReplyListPage />}></Route>
          <Route path="reply_list/reply_modal" element={<ReplyListPage />}></Route>
          <Route path="home" element={<HomePage />}></Route>
          <Route path="home/tweet" element={<HomePage />}></Route>
          <Route path="home/reply_modal" element={<HomePage />}></Route>
          <Route path="*" element={<Navigate to="home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
