import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  clearForm,
  setError,
  setInput,
  setSuccess,
} from "../../../../../redux/AdminCategoryAndSubCategorySlice";

export default function EditCategory({
  modalOpen,
  modalClose,
  categoryId,
  categoryName,
  refreshCategory,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { input, error, success } = useSelector(
    (state) => state.adminCategoryAndSubCategory
  );

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

  const validateForm = () => {
    const newErrors = {};
    if (!input.trim()) {
      newErrors.input = "Category is Required.";
    }
    dispatch(setError(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const editCategorySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/edit-category/${categoryId}`,
        {
          category_title: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.adminToken}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(setSuccess(response.data.message));
        refreshCategory;
        setTimeout(() => {
          dispatch(clearForm());
          modalClose();
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 422) {
          console.error("validation errors:", error.response.data.data);
          dispatch(
            setError({ message: error.response.data.errors.category_title[0] })
          );
        } else if (status === 403) {
          dispatch(
            setError({
              message:
                "Unauthorized. you do not have permissions to perform this action",
            })
          );
        } else if (status === 404) {
          dispatch(setError({ message: "Category not found" }));
        } else {
          console.error(error.response.data.errors);
        }
      } else {
        console.error("Error editing category:", error);
        dispatch(
          setError({
            message: "An unexpected error occurred. Please try again.",
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30">
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-6 rounded-md shadow-md text-center m-8 mx-80">
          <form
            onSubmit={editCategorySubmit}
            className="w-full max-w-md mx-auto font-outfit"
          >
            <div className="mb-4">
              <input
                type="text"
                className={`p-2 my-1 w-full border-2 rounded`}
                placeholder="Enter Category"
                value={categoryName}
                onChange={(e) => {
                    dispatch(setInput(e.target.value));
                    dispatch(setError({ ...error, input: "" }));  
                }}
              />
              {error.input && (
              <span className="text-sm text-red-500">{error.input}</span>
            )}
            </div>
            <div className="mb-4 text-center">
              {error.message && (
                <span className="text-sm text-red-500">{error.message}</span>
              )}
              {error.error && (
                <span className="text-sm text-red-500">{error.error}</span>
              )}
              {success && (
                <span className="text-sm text-green-500">{success}</span>
              )}
            </div>
            <div className="flex justify-center gap-10 mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-slate-900 hover:text-slate-300"
              onClick={modalClose}
            >
              Cancel
            </button> 
              <input
                type="submit"
                className={`text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300 ${
                  isLoading ? "opacity-50 cursor-auto-allowed" : ""
                }`}
                value={isLoading ? "Loading..." : "submit"}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
