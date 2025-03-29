import { useEffect, useState } from "react";
import {
  setEmail,
  setToken,
  setPassword,
  setConfirmPassword,
  setError,
  setSuccess,
  clearForm,
} from "../../../redux/ResetPasswordSlice";
import Svg1 from "./Svg1";
import Svg2 from "./Svg2";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../../../axiosInstance/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { email, token, password, confirmPassword, error, success } =
    useSelector((state) => state.resetPassword);

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status

  const query = useQuery();

  useEffect(() => {
    const token = query.get("token");
    const email = query.get("email");
    dispatch(setToken(token));
    dispatch(setEmail(email));
  }, [query, dispatch]);

  const checkPasswordStrength = (password) => {
    let strength = "weak";
    const regexes = {
      strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };

    if (regexes.strong.test(password)) {
      strength = "Your Password is Strong";
    } else if (regexes.medium.test(password)) {
      strength = "Your Password is Medium";
    } else {
      strength = "Your Password is Weak";
    }

    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 character.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password do not match.";
    }
    dispatch(setError(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      const response = await api.post(
        "/api/reset-password",
        {
          email: email,
          token: token,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(setSuccess(response.data.message));

        setTimeout(() => {
          dispatch(clearForm());
          window.location.href = "/login";
        }, 3000);
      } else if (response.status === 400) {
        dispatch(setError(response.data.error));

        setTimeout(() => {
          dispatch(clearForm());
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.error("validation errors:", validationErrors);
        // dispatch(setError(validationErrors));
      } else {
        console.error("Submission failed:", error);
      }
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="my-10 px-4">
      <form
        className="w-full max-w-md mx-auto font-outfit"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            className={`p-2 my-1 w-full border-2 rounded ${
              error.password ? "border-red-500" : "border-slate-900"
            }`}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              dispatch(setPassword(e.target.value));
              checkPasswordStrength(e.target.value);
              dispatch(setError({ ...error, password: "" })); // Fix here
            }}
          />
          <span
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <Svg1 /> : <Svg2 />}
          </span>
          {error.password && (
            <span className="text-sm text-red-500">{error.password}</span>
          )}
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
            className={`p-2 my-1 w-full border-2 rounded ${
              error.confirmPassword ? "border-red-500" : "border-slate-900"
            }`}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              dispatch(setConfirmPassword(e.target.value));
              dispatch(setError({ ...error, confirmPassword: "" }));
            }}
          />
          <span
            className="absolute top-4 right-3 cursor-pointer"
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

        <div className="mb-4">
          {error.error && (
            <span className="text-sm text-red-500">{error.error}</span>
          )}
          {success && <span className="text-sm text-green-500">{success}</span>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
