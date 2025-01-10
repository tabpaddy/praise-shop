import { useDispatch, useSelector } from "react-redux";
import { setNameOrEmail, setPassword, clearForm } from "../redux/LoginSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LogInForm() {
  const dispatch = useDispatch();
  const { nameOrEmail, password } = useSelector((state) => state.login);

  const [passwordVisible, setPasswordVisible] = useState(false); // Local state for password visibility
  const [errors, setErrors] = useState({}); // Local state for error messages

  const validateForm = () => {
    const newErrors = {};
    if (!nameOrEmail.trim()) {
      newErrors.nameOrEmail = "Name or Email is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    console.log("Form submitted:", { nameOrEmail, password });
    dispatch(clearForm());
  };

  return (
    <div className="my-10 px-4">
      <form
        className="w-full max-w-md mx-auto font-outfit"
        onSubmit={handleSubmit}
      >
        {/* Name or Email Input */}
        <div className="mb-4">
          <input
            className={`p-2 my-1 w-full border-2 rounded ${
              errors.nameOrEmail ? "border-red-500" : "border-slate-900"
            }`}
            type="text"
            name="nameOrEmail"
            placeholder="Name or Email"
            value={nameOrEmail}
            onChange={(e) => {
              dispatch(setNameOrEmail(e.target.value));
              setErrors((prev) => ({ ...prev, nameOrEmail: "" })); // Clear error on change
            }}
          />
          {errors.nameOrEmail && (
            <span className="text-sm text-red-500">{errors.nameOrEmail}</span>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <input
            className={`p-2 my-1 w-full border-2 rounded ${
              errors.password ? "border-red-500" : "border-slate-900"
            }`}
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              dispatch(setPassword(e.target.value));
              setErrors((prev) => ({ ...prev, password: "" })); // Clear error on change
            }}
          />
          <span
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825a3.001 3.001 0 003.9 0m-7.95 0a3.001 3.001 0 003.9 0m7.95-7.95a11.973 11.973 0 01-3.9 6.075m-7.95-6.075a11.973 11.973 0 01-3.9 6.075m3.9-6.075a3.001 3.001 0 003.9 0m-3.9 0a3.001 3.001 0 003.9 0m3.9-6.075A11.973 11.973 0 0112 2.025a11.973 11.973 0 013.9 6.075m-7.95 0A11.973 11.973 0 0112 2.025m0 0a11.973 11.973 0 013.9 6.075m-7.95 0a11.973 11.973 0 013.9 6.075"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12l-3-3m0 0l-3 3m3-3v12m6 0H6"
                />
              </svg>
            )}
          </span>
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>

        {/* Links */}
        <div className="mb-4 flex justify-between">
          <div className="text-left">
            <Link to="/forgottenPassword">
              <span className="text-sm text-slate-500 hover:text-slate-800">
                Forgot your password
              </span>
            </Link>
          </div>
          <div className="text-right">
            <Link to={"/signup"}>
              <span className="text-sm text-slate-500 hover:text-slate-800">
                Create account
              </span>
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <input
            className="text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300"
            type="submit"
            value={"Sign in"}
          />
        </div>
      </form>
    </div>
  );
}
