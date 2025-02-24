import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setIp_address,
  setError,
  setSuccess,
  clearForm,
} from "../../../redux/LoginSlice";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Svg1 from "./Svg1";
import Svg2 from "./Svg2";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import ForgotPasswordInput from "./ForgotPasswordInput";
import api from "../../../axiosInstance/api";

export default function LogInForm() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { email, password, ip_address, error, success } = useSelector(
    (state) => state.login
  );

  const [passwordVisible, setPasswordVisible] = useState(false); // Local state for password visibility
  const [errors, setErrors] = useState({}); // Local state for error messages

  const { updateUser } = useContext(UserContext); // Use the context
  const { cart_id } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json"); // Use IPify API to get the user's IP
        dispatch(setIp_address(response.data.ip)); // Dispatch an action to set the IP address
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, [dispatch]);

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true);
  };

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // const fetchCsrfToken = async () => {
  //   try {
  //     // Add timestamp to bypass browser cache
  //     await api.get(`/sanctum/csrf-cookie?t=${Date.now()}`);
  //     console.log('CSRF Cookies:', document.cookie);
  //   } catch (error) {
  //     console.error("CSRF Error:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return; // Stop submission if validation fails
    }
    console.log(ip_address);
    try {
      // await fetchCsrfToken();
      // console.log("CSRF Cookie:", document.cookie);

      const response = await api.post(
        "/api/login",
        {
          email: email,
          password: password,
          ip_address: ip_address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Update the user context with user data
        const userData = response.data.user; // Replace `response.data.user` with the actual user object from your API
        const userToken = response.data.token;
        const userDataId = response.data.userId;

        // console.log("User data:", userData);
        // console.log("Token:", userToken);
        // console.log("expiresIn:", response.data.expiresIn);
        dispatch(setSuccess(response.data.message));
        const tokenExpiration = new Date(
          Date.now() + response.data.expiresIn * 1000
        ); // Example: expiresIn in seconds
        updateUser({ ...userData, tokenExpiration, userToken, userDataId }); // Save user to context and localStorage

        // Merge guest cart
        
        if (cart_id) {
          await api.post(
            "/api/merge-cart",
            { cart_id: cart_id },
            {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
              },
              withCredentials: true,
            }
          );
          // // Optionally clear cart_id after merging
          // localStorage.removeItem("cart_id");
        }
        
        setTimeout(() => {
          dispatch(clearForm());
          window.location.href = "/";
        }, 1000);
        //console.log("User data:", userData);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.error("Validation errors:", validationErrors);
        dispatch(
          setError({
            message:
              validationErrors.email ||
              validationErrors.password ||
              validationErrors.ip_address,
          })
        );
      } else {
        console.error("Submission failed:", error);
      }
    } finally {
      setLoading(false);
    }
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
            autoComplete="off"
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
            autoComplete="off"
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

        <div className="mb-4 justify-center flex">
          {/* General error message */}
          {error.message && (
            <span className="text-sm text-red-500">{error.message}</span>
          )}
          {/* success message */}
          {success && <span className="text-sm text-green-500">{success}</span>}
          {/* Field-specific error messages */}
          {error.email && (
            <span className="text-sm text-red-500">{error.email[0]}</span>
          )}
          {error.password && (
            <span className="text-sm text-red-500">{error.password[0]}</span>
          )}
        </div>

        {/* Links */}
        <div className="mb-4 flex justify-between">
          <div className="text-left">
            <span
              className="text-sm text-slate-500 hover:text-slate-800"
              onClick={handleForgotPasswordClick} //open modal
            >
              Forgot your password
            </span>
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
            value={loading ? "Loading..." : "Sign in"}
          />
        </div>
      </form>

      {/* Import and use the ForgotPasswordInput*/}
      <ForgotPasswordInput
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}
