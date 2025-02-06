import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import axios from "axios";

export default function DeleteUserModal({
  modalOpen,
  modalClose,
  userId,
  userName,
  refreshUsers,
}) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

  if (!admin || !admin.adminToken) {
    console.error("Admin token is missing or invalid");
    return;
  }

  const deleteUserSubmit = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/manage-user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin?.adminToken}`, // Ensure adminToken exists
          },
        }
      );

      // Handle success response
      if (response.status === 200) {
        setSuccess(response.data.message);
        refreshUsers; // Refresh the user list
        setTimeout(() => {
          modalClose();
        }, 2000);
      }
    } catch (error) {
      // Handle error responses
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.error || "An error occurred";

        if (status === 401) {
          setError("Unauthenticated. Please log in again.");
        } else if (status === 403) {
          setError(
            "Unauthorized. You do not have permission to perform this action."
          );
        } else if (status === 404) {
          setError("User not found.");
        } else {
          setError(errorMessage);
        }
      } else {
        console.error("Error deleting user:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
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
          <div className="bg-white p-6 rounded-md shadow-md text-center m-8 mx-10 xl:mx-80">
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
              {/* error message */}
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
