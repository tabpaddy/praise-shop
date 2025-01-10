import { useReducer, useState } from "react";
import { Link } from "react-router-dom";

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
      case "setError":
        return { ...state, errors: { ...state.errors, ...action.payload } };
      case "clearForm":
        return { name: "", email: "", password: "", errors: {} };
      default:
        return state;
    }
  };

  const initialState = {
    name: "",
    email: "",
    password: "",
    errors: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

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

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "setError", payload: errors });
      return;
    }

    try {
      console.log("Form submitted:", {
        name: state.name,
        email: state.email,
        password: state.password,
      });
      dispatch({ type: "clearForm" });
      setPasswordStrength("");
    } catch (error) {
      console.error("Submission failed:", error);
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
          />
          {/* Eye Icon */}
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
                  d="M15 12l-3-3m0 0l-3 3m3-3v12m6 0H6"
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
                  d="M12 5v7m0 4h-3m3 0h3"
                />
              </svg>
            )}
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
