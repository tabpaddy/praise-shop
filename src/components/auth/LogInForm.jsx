import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setError,
  clearForm,
} from "../redux/LoginSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import Svg1 from "./Svg1";
import Svg2 from "./Svg2";
import axios from "axios";
const { updateUser } = useContext(UserContext); // Use the context

export default function LogInForm() {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.login);

  const [passwordVisible, setPasswordVisible] = useState(false); // Local state for password visibility
  const [errors, setErrors] = useState({}); // Local state for error messages

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Update the user context with user data
        const userData = response.json; // Replace `response.data.user` with the actual user object from your API
        updateUser(userData);
        
        setTimeout(() => {
          dispatch(clearForm());
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("validation errors:", error.response.data);
        dispatch(setError(error.response.data.errors));
      } else {
        console.error("submission failed:", error);
      }
    }

    console.log("Form submitted:", { email, password });
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
              errors.email ? "border-red-500" : "border-slate-900"
            }`}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
              setErrors((prev) => ({ ...prev, email: "" })); // Clear error on change
            }}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
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
            {passwordVisible ? <Svg1 /> : <Svg2 />}
          </span>
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>

        <div className="mb-4">
          {/*success and error messages*/}
          {error && (
            <span className={`text-sm ${`text-red-500`}`}>{error}</span>
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
