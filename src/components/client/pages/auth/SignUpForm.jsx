import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Svg1 from "./Svg1";
import Svg2 from "./Svg2";
import api from "../../../axiosInstance/api";

export default function SignUpForm() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "setName":
        return {
          ...state,
          name: action.payload,
          errors: { ...state.errors, name: "" },
        };
      case "setEmail":
        return {
          ...state,
          email: action.payload,
          errors: { ...state.errors, email: "" },
        };
      case "setPassword":
        return {
          ...state,
          password: action.payload,
          errors: { ...state.errors, password: "" },
        };
      case "setPasswordConfirmation":
        return {
          ...state,
          passwordConfirmation: action.payload,
          errors: { ...state.errors, passwordConfirmation: "" }, // Clear password errors when updated
        };

      case "setIpAddress":
        return {
          ...state,
          ip_address: action.payload, // Update IP address
        };
      case "setError":
        return { ...state, errors: { ...state.errors, ...action.payload } };
      case "setSuccess":
        return { ...state, success: { ...state.success, ...action.payload } };
      case "clearForm":
        return { name: "", email: "", password: "", ipAddress: "", errors: {} };
      default:
        return state;
    }
  };

  const initialState = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    ip_address: "",
    errors: {},
    success: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false); // State to toggle password visibility

  // useEffect(() => {
  //   const fetchIpAddress = async () => {
  //     try {
  //       const response = await axios.get("https://api.ipify.org?format=json"); // Use IPify API to get the user's IP
  //       dispatch({ type: "setIpAddress", payload: response.data.ip }); // Dispatch an action to set the IP address
  //     } catch (error) {
  //       console.error("Error fetching IP address:", error);
  //     }
  //   };

  //   fetchIpAddress();
  // }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!state.name) errors.name = "Name is required.";
    if (!state.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(state.email))
      errors.email = "Email is invalid.";
    if (!state.password) errors.password = "Password is required.";
    else if (state.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (state.password !== state.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "setError", payload: errors });
      return;
    }

    try {
      const response = await api.post(
        "/api/register",
        {
          name: state.name,
          email: state.email,
          password: state.password,
          password_confirmation: state.passwordConfirmation, // Include this
          //ip_address: state.ip_address,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "setSuccess", payload: "Registration successful!" });
        setTimeout(() => {
          dispatch({ type: "clearForm" });
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data);

        dispatch({ type: "setError", payload: error.response.data.errors });
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
        <div className="mb-4">
          <input
            className={`p-2 my-1 w-full border-2 rounded ${
              state.errors.name ? "border-red-500" : "border-slate-900"
            }`}
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
            autoComplete="off"
          />
          {state.errors.name && (
            <span className="text-red-500 text-sm">{state.errors.name}</span>
          )}
        </div>

        <div className="mb-4">
          <input
            className={`p-2 my-1 w-full border-2 rounded ${
              state.errors.email ? "border-red-500" : "border-slate-900"
            }`}
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
            autoComplete="off"
          />
          {state.errors.email && (
            <span className="text-red-500 text-sm">{state.errors.email}</span>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            className={`p-2 my-1 w-full border-2 rounded ${
              state.errors.password ? "border-red-500" : "border-slate-900"
            }`}
            type={passwordVisible ? "text" : "password"} // Toggle input type
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) => {
              dispatch({ type: "setPassword", payload: e.target.value });
              checkPasswordStrength(e.target.value);
            }}
            autoComplete="off"
          />
          {/* Eye Icon */}
          <span
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <Svg1 /> : <Svg2 />}
          </span>
          {/* Error Message */}
          {state.errors.password && (
            <span className="text-red-500 text-sm">
              {state.errors.password}
            </span>
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
            className={`p-2 my-1 w-full border-2 rounded ${
              state.errors.passwordConfirmation
                ? "border-red-500"
                : "border-slate-900"
            }`}
            type={passwordConfirmationVisible ? "text" : "password"}
            name="passwordConfirmation"
            placeholder="Confirm Password"
            value={state.passwordConfirmation}
            onChange={(e) =>
              dispatch({
                type: "setPasswordConfirmation",
                payload: e.target.value,
              })
            }
            autoComplete="off"
          />
          {/* Eye Icon */}
          <span
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() =>
              setPasswordConfirmationVisible(!passwordConfirmationVisible)
            }
          >
            {passwordConfirmationVisible ? <Svg1 /> : <Svg2 />}
          </span>
          {state.errors.passwordConfirmation && (
            <span className="text-red-500 text-sm">
              {state.errors.passwordConfirmation}
            </span>
          )}
        </div>

        <div className="mb-4">
          {/*success and error messages*/}
          {state.success && (
            <span
              className={`text-sm ${
                state.success
                  ? `text-green-500 `
                  : state.error
                  ? `text-red-500`
                  : ``
              }`}
            >
              {state.success}
            </span>
          )}
        </div>

        <div className="text-left mb-4">
          <Link to="/login">
            <span className="text-sm text-slate-500 hover:text-slate-800">
              Already have an account?
            </span>
          </Link>
        </div>

        <div className="text-center">
          <input
            className="text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300"
            type="submit"
            value="Create"
          />
        </div>
      </form>
    </div>
  );
}
