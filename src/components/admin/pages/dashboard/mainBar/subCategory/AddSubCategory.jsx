import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContext } from "../../../../../context/AdminContext";
import {
  setError,
  setSuccess,
  clearForm,
  setInput,
} from "../../../../../redux/AdminSubCategorySlice";
import axios from "axios";

export default function AddSubCategory(){
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { input, error, success } = useSelector(
      (state) => state.adminSubCategory
    );
    const { admin } = useContext(AdminContext);
  
    const validateForm = () => {
      const newErrors = {};
      if (!input.trim()) {
        newErrors.input = "SubCategory is Required.";
      }
      dispatch(setError(newErrors));
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/admin/add-sub-category",
          {
            sub_category_title: input,
          },
          {
            headers: {
              "Content-TYpe": "application/json",
              Authorization: `Bearer ${admin.adminToken}`,
            },
          }
        );
        if (response.status === 200) {
          dispatch(setSuccess(response.data.message));
          setTimeout(() => {
            dispatch(clearForm());
            window.location.href = '/admin/dashboard/manage-sub-category'
          }, 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.error("validation errors:", error.response.data);
          const validationErrors = error.response.data.errors;
          dispatch(
            setError({message: validationErrors.category_title[0] })
          );
        } else {
          console.error("submission failed:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    return(
        <div className="overflow-y-auto bg-slate-200 font-outfit p-4">
      <div className="text-center my-2 mt-10">
        <h3 className="text-slate-700 relative font-prata font-normal text-2xl sm:text-3xl">
          Create{" "}
          <span className="relative after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[0.5] after:bg-black after:left-full after:top-1/2 after:ml-2">
            SubCategory
          </span>
        </h3>
      </div>
      <div className="flex justify-center items-center my-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto font-outfit"
        >
          <div className="mb-4">
            <input
              type="text"
              className={`p-2 my-1 w-full border-2 rounded ${
                error.input ? "border-red-500" : "border-slate-900"
              }`}
              placeholder="Enter SubCategory"
              value={input}
              onChange={(e) => {
                dispatch(setInput(e.target.value));
                dispatch(setError({ ...error, input: "" }));
              }}
            />
            {error.input && (
              <span className="text-sm text-red-500">{error.input}</span>
            )}
          </div>
          {/* success and errors */}
          <div className="mb-4 flex justify-center">
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
          <div className="text-center">
            <input
              type="submit"
              className={`text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              value={isLoading ? "Loading..." : "Submit"}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
    )
}