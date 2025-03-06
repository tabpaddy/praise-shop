import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";

export default function LogoutUserModal({ modalOpen, modalClose }) {
  const { logoutUser } = useContext(UserContext);

  const [success, setSuccess] = useState("");

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        modalClose();
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [modalOpen, modalClose]);

  if (!modalOpen) return null;

  const logoutUserSubmit = () => {
    const response = logoutUser();
    if (response) {
      setSuccess("Logout successful");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/30"
      onClick={modalClose} // Close modal when clicking outside
    >
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-3/4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div>
          <div className="bg-white p-6 rounded-md shadow-md text-center m-8">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout
            </h2>

            <div className="flex justify-center gap-10  mb-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md mr-2 hover:bg-slate-900 hover:text-slate-300"
                onClick={modalClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800"
                onClick={logoutUserSubmit}
              >
                Logout
              </button>
            </div>
            <div className="mb-4">
              {/* success message */}
              {success && (
                <span className="text-sm text-green-500">{success}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
