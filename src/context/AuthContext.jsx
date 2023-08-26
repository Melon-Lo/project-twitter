import { login } from 'api/auth';
import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode'

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  return (
    <AuthContext.Provider 
      value={{
        login: async (data) => {
          const { token } = await login({
            account: data.account,
            password: data.password,
          })
          const tempPayload = jwt_decode(token)
          if(tempPayload) {
            setPayload(tempPayload)
            setIsAuthenticated(true)
            localStorage.setItem('authToken', token)
          } else {
            setPayload(null)
            setIsAuthenticated(false)
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
