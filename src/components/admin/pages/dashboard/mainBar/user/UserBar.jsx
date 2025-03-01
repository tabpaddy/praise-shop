import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setError,
  setSuccess,
  clearForm,
} from "../../../../../redux/AdminCreateUserSlice";
import Svg1 from "../../../../../client/pages/auth/Svg1";
import Svg2 from "../../../../../client/pages/auth/Svg2";
import axios from "axios";
import { AdminContext } from "../../../../../context/AdminContext";
import api from "../../../../../axiosInstance/api";

export default function UserBar() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, confirmPassword, error, success } =
    useSelector((state) => state.adminCreateUser);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);

  const { admin } = useContext(AdminContext);
  //console.log(admin.adminToken);
  const checkPasswordStrength = (password) => {
    let strength = "weak";
    const regaxes = {
      strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };

    if (regaxes.strong.test(password)) {
      strength = "The Password is Strong";
    } else if (regaxes.medium.test(password)) {
      strength = "The Password is Medium";
    } else {
      strength = "The Password is Weak";
    }

    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at 8 characters.";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
      const response = await api.post(
        "/api/add-user",
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${admin.adminToken}`,
          },
      }
      );

      if (response.status === 200) {
        dispatch(setSuccess("Registration successful!"));
        setTimeout(() => {
          dispatch(clearForm());
          window.location.href = '/admin/dashboard/manage-users'
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data);
        dispatch(setError(error.response.data.errors));
      } else {
        console.error("submission failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-4">
      <div className="text-center my-2 mt-10">
        <h3 className="text-slate-700 relative font-prata font-normal text-2xl sm:text-3xl">
          Create{" "}
          <span className="relative after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[0.5px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            User
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
              className={`p-2 my-1 w-full border-2 rounded ${
                error.name ? "border-red-500" : "border-slate-900"
              }`}
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                dispatch(setName(e.target.value));
                dispatch(setError({ ...error, name: "" }));
              }}
            />
            {error.name && (
              <span className="text-sm text-red-500">{error.name}</span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              className={`p-2 my-1 w-full border-2 rounded ${
                error.email ? "border-red-500" : "border-slate-900"
              }`}
              name="email"
              placeholder="Email"
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
          <div className="mb-4 relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className={`p-2 my-1 w-full border-2 rounded ${
                error.password ? "border-red-500" : "border-slate-900"
              }`}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                dispatch(setPassword(e.target.value));
                dispatch(setError({ ...error, password: "" }));
                checkPasswordStrength(e.target.value);
              }}
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <Svg1 /> : <Svg2 />}
            </span>
            {error.password && (
              <span className="text-sm text-red-500">{error.password}</span>
            )}
            {/* Password Strength */}
            {passwordStrength && (
              <span
                className={`text-sm ${
                  passwordStrength.includes("Strong")
                  ? "text-green-500"
                  : passwordStrength.includes("Medium")
                  ? "text-yellow-500"
                  : "text-red-500"
                }`}
              >
                {passwordStrength}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <input
              type={passwordConfirmationVisible ? "text" : "password"}
              className={`p-2 my-1 w-full border-2 rounded  ${
                error.confirmPassword ? "border-red-500" : "border-slate-900"
              }`}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                dispatch(setConfirmPassword(e.target.value));
                dispatch(setError({ ...error, confirmPassword: "" }));
              }}
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() =>
                setPasswordConfirmationVisible(!passwordConfirmationVisible)
              }
            >
              {passwordConfirmationVisible ? <Svg1 /> : <Svg2 />}
            </span>
            {error.confirmPassword && (
              <span className="text-sm text-red-500">
                {error.confirmPassword}
              </span>
            )}
          </div>

          <div className="mb-4 justify-center flex">
            {error.error && (
              <span className="text-sm text-red-500">{error.error}</span>
            )}
            {success && (
              <span className="text-sm text-green-500">{success}</span>
            )}
          </div>
          <div className="text-center">
            <input
              className={`text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading} // Disable button when loading
              value={isLoading ? "Loading..." : "Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
