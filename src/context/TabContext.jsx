import { createContext, useState } from "react";

export const TabContext = createContext()

export default function TabContextProvider({ children }) {
  const [tab, setTab] = useState('tweet')

  return (
    <TabContext.Provider
      value={{
        tab,
        setTab,
      }}
    >
      {children}
    </TabContext.Provider>
  )
}