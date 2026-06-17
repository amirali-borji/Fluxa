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
    <div className="fixed inset-0 bg-black/10 backdrop-blur-[5px] transition-all ease-in-out flex items-center justify-center font-dana-medium">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-fluxa-surface-2 w-80 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-5 text-center">
          <p>{modalText}</p>
        </div>

        <div className="flex border-t border-fluxa-border-strong">
          <button
            onClick={() => {
              yesHandler?.();
              setModalOpen(false);
              setYesHandler(null);
            }}
            className="w-1/2 py-3 text-fluxa-text-secondary font-dana-medium transition border-l border-fluxa-border-strong hover:bg-fluxa-surface-hover"
          >
            بله
          </button>

          <button
            onClick={() => {
              setModalOpen(false);
              noHandler?.();
            }}
            className="w-1/2 py-3 text-fluxa-text-secondary font-dana-medium transition hover:bg-fluxa-surface-hover"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

// function Modal({ isOpen, title, onYes, onNo }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-fluxa-surface-2 w-80 rounded-2xl shadow-xl overflow-hidden">
//         {/* متن */}
//         <div className="p-5 text-center">
//           <p className="text-gray-800 text-base font-medium">{title}</p>
//         </div>

//         {/* دکمه‌ها */}
//         <div className="flex border-t border-fluxa-border-strong">
//           <button
//             onClick={onYes}
//             className="w-1/2 py-3 text-fluxa-text-secondary font-dana-medium transition border-l border-fluxa-border-strong hover:bg-fluxa-surface-hover"
//           >
//             بله
//           </button>

//           <button
//             onClick={onNo}
//             className="w-1/2 py-3 transition text-fluxa-text-secondary  font-dana-medium hover:bg-fluxa-surface-hover"
//           >
//             خیر
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;
