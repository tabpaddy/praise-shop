import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import axios from "axios";

export default function DeleteAdminModel({
  modalOpen,
  modalClose,
  adminId,
  adminName,
  refreshAdmin,
}) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { admin } = useContext(AdminContext);

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

  if (!admin || !admin.adminToken) {
    console.error("Admin token is missing or invalid");
    return;
  }

  const deleteAdminSubmit = async () => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/admin/sub-admin/${adminId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${admin.adminToken}`, // adminToken
            }
        });

        // handle success response
        if (response.status === 200){
            setSuccess(response.data.message)
            refreshAdmin; // refresh the admin list
            setTimeout(() => {
                modalClose();
            }, 2000);
        }
    } catch (error) {
        if(error.response){
            const status = error.response.status
            const errorMessage = error.response.data.error

            if(status === 403){
                setError("Unauthorized. you do not have permissions to perform this action")
                console.error(error.response);
            }else if (status === 404){
                setError("Admin not found.");
            }else {
                setError(errorMessage);
            }
        }else{
            console.error("Error deleting admin:", error.message);
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
        <div className="bg-white p-6 rounded-md shadow-md text-center m-8 mx-10 xl:mx-80">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to delete this Admin (name: {adminName})
          </h2>

          <div className="flex justify-center gap-10 mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-slate-900 hover:text-slate-300"
              onClick={modalClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-800"
              onClick={deleteAdminSubmit}
            >
              Delete
            </button>
          </div>
          <div className="mb-4">
            {/* success message */}
            {success && (
              <span className="text-sm text-green-500">{success}</span>
            )}
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
