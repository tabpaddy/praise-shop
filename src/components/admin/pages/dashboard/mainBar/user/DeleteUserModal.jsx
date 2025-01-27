import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";

export default function DeleteUserModal({
  modalOpen,
  modalClose,
  userId,
  userName,
}) {
  const [success, setSuccess] = useState("");

  const { admin } = useContext(AdminContext);

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

  const deleteUserSubmit = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/manage-user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin?.adminToken}`, // Ensure adminToken exists
          },
        }
      );
      setSuccess("User deleted successfully.");
      setTimeout(() => {
        modalClose();
      }, 2000);
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/30"
      onClick={modalClose}
    >
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="bg-white p-6 rounded-md shadow-md text-center m-8 mx-80">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user (Name: {userName})?
            </h2>

            <div className="flex justify-center gap-10  mb-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-slate-900 hover:text-slate-300"
                onClick={modalClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800"
                onClick={deleteUserSubmit}
              >
                Delete
              </button>
            </div>
            <div className="mb-4">
              {/* Success message */}
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
