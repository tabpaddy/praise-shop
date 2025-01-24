import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setError,
  setSuccess,
  clearForm,
} from "../../../redux/AdminLoginSlice";
import Svg1 from "../../../client/pages/auth/Svg1";
import Svg2 from "../../../client/pages/auth/Svg2";

import { useContext, useState } from "react";
import { AdminContext } from "../../../context/AdminContext";
import axios from "axios";

export default function AdminLoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { updateAdmin } = useContext(AdminContext);

  const dispatch = useDispatch();
  const { email, password, error, success } = useSelector(
    (state) => state.AdminLogin
  );

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    dispatch(setError(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // stop submission if validation fails
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const adminData = response.data.admin;
        const adminToken = response.data.token;
        dispatch(setSuccess("Login successful"));
        const tokenExpiration = new Date(Date.now() + 3600 * 1000); // 1 hour
        updateAdmin({ ...adminData, adminToken, tokenExpiration }); // save admin to context and localStorage
        setTimeout(() => {
          dispatch(clearForm());
          window.location.href = "/admin/dashboard";
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        dispatch(setError(validationErrors));
        console.error("Validation errors:", validationErrors);
      } else {
        console.error("Submission failed:", error);
      }
    }
  };
  return (
    <div className="my-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto font-outfit"
      >
        {/* email input */}
        <div className="mb-4">
          <input
            className={`p-2 my-1 w-full border-2 rounded ${
              error.email ? " border-red-500" : " border-slate-900"
            }`}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
              dispatch(setError({ ...error, email: "" }));
            }}
          />
          {error.email && (
            <span className="text-sm text-red-500">{error.email}</span>
          )}
        </div>

        {/* password input */}
        <div className="mb-4 relative">
          <input
            className={`p-2 my-1 w-full border-2 rounded  ${
              error.password ? "border-red-500" : "border-slate-900"
            } `}
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="password"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              dispatch(setPassword(e.target.value));
              dispatch(setError({ ...error, password: "" }));
            }}
          />
          <span
            className="absolute top-3 right-3 cursor-pointer "
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <Svg1 /> : <Svg2 />}
          </span>
          {error.password && (
            <span className="text-sm text-red-500 ">{error.password}</span>
          )}
        </div>

        <div className="mb-4 justify-center flex">
          {/* general error message */}
          {error.message && (
            <span className="text-sm text-red-500">{error.message}</span>
          )}

          {/* success message */}
          {success && <span className="text-sm text-green-500">{success}</span>}
        </div>

        {/* submit button */}
        <div className="text-center">
          <input
            type="submit"
            value={"Login"}
            className="text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300"
          />
        </div>
      </form>
    </div>
  );
}
