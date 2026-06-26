import { useModal } from "../../context/ModalContext";

function Modal() {
  const {
    modalOpen,
    setModalOpen,
    modalText,
    yesHandler,
    noHandler,
    setYesHandler,
  } = useModal();

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-[5px] transition-all ease-in-out flex items-center justify-center font-dana-medium p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-fluxa-surface-2 w-full max-w-xs sm:max-w-sm rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-4 sm:p-5 text-center">
          <p className="break-words text-sm sm:text-base">{modalText}</p>
        </div>

        <div className="flex border-t border-fluxa-border-strong">
          <button
            onClick={() => {
              yesHandler?.();
              setModalOpen(false);
              setYesHandler(null);
            }}
            className="w-1/2 py-2.5 sm:py-3 text-sm sm:text-base text-fluxa-text-secondary font-dana-medium transition border-l border-fluxa-border-strong hover:bg-fluxa-surface-hover"
          >
            بله
          </button>

          <button
            onClick={() => {
              setModalOpen(false);
              noHandler?.();
            }}
            className="w-1/2 py-2.5 sm:py-3 text-sm sm:text-base text-fluxa-text-secondary font-dana-medium transition hover:bg-fluxa-surface-hover"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;