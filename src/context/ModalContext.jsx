import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [yesHandler, setYesHandler] = useState(null);
  const [noHandler, setNoHandler] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        setModalOpen,

        modalText,
        setModalText,

        yesHandler,
        setYesHandler,

        noHandler,
        setNoHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
