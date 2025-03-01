import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import axios from "axios";
import api from "../../../../../axiosInstance/api";

export default function DeleteProduct({
  modalOpen,
  modalClose,
  productId,
  productName,
  refreshProduct,
}) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const deleteProductSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete(
        `/api/admin/manage-product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.adminToken}`,
          },
        }
      );

      //   handle success response
      if (response.status === 200) {
        setSuccess(response.data.message);
        refreshProduct();
        setTimeout(() => {
          modalClose();
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.error;

        if (status === 403) {
          setError(
            "Unauthorized. you do not have permissions to perform this action"
          );
          console.error(error.response);
        } else if (status === 404) {
          setError("Product not found.");
        } else {
          setError(errorMessage);
        }
      } else {
        console.error("Error deleting Product:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 backdrop:backdrop-blur-md bg-black/30"
      onClick={modalClose}
    >
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-6 rounded-md shadow-md text-center mt-8 xl:mx-80 mx-10">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to delete this Product (name: {productName})
          </h2>

          <div className="flex justify-center gap-10 mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-slate-900 hover:text-slate-300"
              onClick={modalClose}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 bg-red-500 rounded-md hover:bg-red-800 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={deleteProductSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Delete"}
            </button>
          </div>
          <div className="mb-4">
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
