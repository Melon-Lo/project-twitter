import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "context/AuthContext";

export const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/main')
    } else {
      navigate('/login')
    }
  }, [navigate, isAuthenticated])

  return <div>HomePage</div>
}