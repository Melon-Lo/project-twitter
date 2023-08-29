import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "context/AuthContext";

export const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  // 撈取 localStorage 中的 userInfo
  let savedUserInfo = {}

  if(localStorage.getItem("userInfo")) {
    savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  }

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/main')
    } else {
      navigate('/login')
    }
  }, [navigate, isAuthenticated])

  return <div>HomePage</div>
}