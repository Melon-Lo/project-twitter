import { createContext, useState } from "react";

export const TabContext = createContext()

export default function TabContextProvider({ children }) {
  const [tab, setTab] = useState('tweet')
  const [followTab, setFollowTab] = useState('follower')

  return (
    <TabContext.Provider
      value={{
        tab,
        setTab,
        followTab,
        setFollowTab,
      }}
    >
      {children}
    </TabContext.Provider>
  )
}