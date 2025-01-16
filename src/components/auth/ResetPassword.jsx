import { useEffect, useState } from "react";
import {
  setEmail,
  setToken,
  setPassword,
  setConfirmPassword,
  setError,
  setSuccess,
} from "../redux/ResetPasswordSlice";
import Svg1 from "./Svg1";
import Svg2 from "./Svg2";
import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "../redux/LoginSlice";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { email, token, password, confirmPassword, error, success } =
    useSelector((state) => state.resetPassword);

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false); // State to toggle password visibility

    const query = useQuery();

    useEffect(() => {
        const token = query.get("token");
        const email = query.get("email");
        dispatch(setToken(token));
        dispatch(setEmail(email));
    }, [query, dispatch])

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
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password do not match.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // stop submission
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reset-password",
        {
          email: email,
          token: token,
          password: password,
          confirmPassword: confirmPassword,
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
        dispatch(setError(validationErrors));
      } else {
        console.error("Submission failed:", error);
      }
    }
  };
  return (
    <div className="my-10 px-4">
      <form
        className="w-full max-w-md mx-auto font-outfit"
        onSubmit={handleSubmit}
      >
        {/*password && confirm password*/}
        <div className="mb-4 relative">
          <input
            type={passwordVisible ? "text" : "password"} // Toggle input type
            className={`p-2 my-1 w-full border-2 rounded ${
              error.password ? "border-red-500" : ""
            }`}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              dispatch(setPassword(e.target.value));
              checkPasswordStrength(e.target.value);
              setError((prev) => ({ ...prev, password: "" })); // clear error on change
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
            type={passwordConfirmationVisible ? "text" : "password"} // Toggle input type
            className={`p-2 my-1 w-full border-2 rounded ${
              error.confirmPassword ? "border-red-500" : ""
            }`}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              dispatch(setConfirmPassword(e.target.value));
              setError((prev) => ({ ...prev, confirmPassword: "" })); // clear error on change
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

        <div className="mb-4">
          {/* General error message */}
          {error.error && (
            <span className="text-sm text-red-500">{error.error}</span>
          )}

          {success && (
            <span className="text-sm text-green-500">{success}</span>
          )}

          {/* Field-specific error messages */}
          {error.password && (
            <span className="text-sm text-red-500">{error.password[0]}</span>
          )}
          {error.confirmPassword && (
            <span className="text-sm text-red-500">
              {error.confirmPassword[0]}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <input
            className="text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300"
            type="submit"
            value={"Submit"}
          />
        </div>
      </form>
    </div>
  );
}
