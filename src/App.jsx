import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { AdminLoginPage } from 'pages/AdminLoginPage';
import { AdminPage } from 'pages/AdminPage';
import { LoginPage } from 'pages/LoginPage';
import { SettingPage } from 'pages/SettingPage';
import { SignUpPage } from 'pages/SignUpPage';
import { UserPage } from 'pages/UserPage';


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
          <Route path="*" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
