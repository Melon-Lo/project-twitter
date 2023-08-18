import { createContext, useState } from "react";

export const ModalContext = createContext()

export default function ModalContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        showReplyModal,
        setShowReplyModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}