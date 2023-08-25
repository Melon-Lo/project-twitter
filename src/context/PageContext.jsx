import { createContext, useState } from "react";

export const PageContext = createContext()

export default function PageContextProvider({ children }) {
  const [page, setPage] = useState('home')
  const [adminPage, setAdminPage] = useState('tweet')

  return (
    <PageContext.Provider
      value={{
        page,
        adminPage,
        setPage,
        setAdminPage,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}