import { SignUp } from "components/SignUp/SignUp";
import './SignUpPage.scss'
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const SignUpPage = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem("authToken")

  useEffect(() => {
    if(authToken) {
      navigate('/main')
    }
  }, [])

  return (
    <div className='signWapper'>
      <SignUp />
    </div>
  )
};