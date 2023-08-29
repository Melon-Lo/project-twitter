import { createContext, useState } from "react";

export const PageContext = createContext()

export default function PageContextProvider({ children }) {
  const [page, setPage] = useState('main')
  const [adminPage, setAdminPage] = useState('tweet')

  const [user, setUser] = useState('self')

  return (
    <PageContext.Provider
      value={{
        page,
        adminPage,
        setPage,
        setAdminPage,
        user,
        setUser,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}