import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearForm,
  setConfirmPassword,
  setEmail,
  setError,
  setName,
  setPassword,
  setSuccess,
} from "../../../../../redux/AdminCreateSubAdminSlice";
import axios from "axios";
import Svg1 from "../../../../../client/pages/auth/Svg1";
import Svg2 from "../../../../../client/pages/auth/Svg2";

export default function AddAdmin() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, confirmPassword, error, success } =
    useSelector((state) => state.adminCreateSubAdmin);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);

  const checkPasswordStrength = (password) => {
    let strength = "weak";
    const regaxes = {
      strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}$/,
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
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password fo not match";
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
        "http://127.0.0.1:8000/api/admin/create-sub-admin",
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        dispatch(setSuccess(response.data.message));
        setTimeout(() => {
          dispatch(clearForm());
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("validation errors:", error.response.data);
        const validationErrors = error.response.data.errors;
        dispatch(
          setError({
            message:
              validationErrors.name ||
              validationErrors.email ||
              validationErrors.password,
          })
        );
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
            SubAdmin
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
              placeholder="name"
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
              className={`p-2 my-1 w-full border-2 rounded ${
                error.email ? "border-red-500" : "border-slate-900"
              }`}
              type="email"
              name="email"
              placeholder="email"
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
              className={`p-2 my-1 w-full border-2 rounded ${
                error.password ? "border-red-500" : "border-slate-900"
              }`}
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="password"
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
            {/* password strength */}
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
              className={`p-2 my-1 w-full border-2 rounded ${
                error.confirmPassword ? "border-red-500" : "border-slate-900"
              }`}
              type={passwordConfirmationVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="confirmPassword"
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
          {/* success and errors */}
          <div className="mb-4 justify-center flex">
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
              className={`text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300`}
              value={isLoading ? "Loading..." : "submit"}
              disabled={isLoading} // disable button when loading
            />
          </div>
        </form>
      </div>
    </div>
  );
}
