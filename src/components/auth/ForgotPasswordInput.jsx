import { useEffect } from "react";

export default function ForgotPasswordInput({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("Keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("Keydown", handleKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/30"
      onClick={onClose} //close modal when clicking outside
    >
      <div className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] px-4 sm:px-8"
      onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <input
            type="email"
            placeholder="Enter Email Registered with..."
            className="w-full p-3 pl-30 border border-x-gray-300 rounded-md shadow-md focus:outline-none focus:ring-0 text-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}
