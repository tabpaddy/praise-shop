import { useEffect } from "react";

export default function AlertModal({ modalOpen, modalClose, message }) {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.Key === "Escape") {
        modalClose();
      }
    };
    if (modalOpen) {
      document.addEventListener("Keydown", handleKeydown);
    }
    return () => {
      document.removeEventListener("Keydown", handleKeydown);
    };
  }, [modalOpen, modalClose]);

  if (!modalOpen) return null;

    // Handle both string and object cases
    const displayMessage = typeof message === "object" ? message.message || JSON.stringify(message) : message;
  return (
    <div
      className="fixed inset-0 z-50 backdrop:backdrop-blur-md bg-black/30"
      onClick={modalClose}
    >
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white w-3/4 md:w-1/2 mx-auto my-20 p-4 rounded-md">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-red-500">Alert</h3>
            <p className="text-lg font-light text-gray-700 px-6 my-2">{displayMessage}</p>
          </div>
          <div className="text-center">
            <button
              onClick={modalClose}
              className=" px-12 py-3.5 my-2 shadow-sm bg-red-500 text-white text-sm sm:text-lg font-semibold rounded-md hover:bg-red-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
