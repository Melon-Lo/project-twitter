import { Login } from "components/Login/Login";
import './LoginPage.scss'
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem("authToken")

  useEffect(() => {
    if(authToken) {
      navigate('/main')
    }
  }, [])

  return (
    <div className="loginWapper">
      <Login /> 
   </div>
  )
};