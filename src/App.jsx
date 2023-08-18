import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/HomePage/HomePage';
import { AdminLoginPage } from 'pages/AdminLoginPage/AdminLoginPage';
import { AdminPage } from 'pages/AdminPage/AdminPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { SettingPage } from 'pages/SettingPage/SettingPage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';
import { UserPage } from 'pages/UserPage/UserPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="admin-login" element={<AdminLoginPage />}></Route>
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="setting" element={<SettingPage />}></Route>
          <Route path="user" element={<UserPage />}></Route>
          <Route path="admin" element={<AdminPage />}></Route>
          <Route path="main" element={<HomePage />}></Route>
          <Route path="*" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
