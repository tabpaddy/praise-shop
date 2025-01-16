import axios from "axios";
import { useEffect, useState } from "react";

export default function ForgotPasswordInput({ isOpen, onClose }) {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/forgot-password",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(email);

      if (response.status === 200) {
        setMessage("Password reset link sent successfully.");

        setTimeout(() => {
          setEmail(""); // Clear the input field
          setMessage(""); // Clear the success message
          onClose(); // Close the modal
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError("Email not found. Please check and try again.");
        } else if (error.response.status === 422) {
          setError("Invalid email format.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("Unable to connect to the server. Please check your network.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/30"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] px-4 sm:px-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
      >
        <form
          className="relative bg-white p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Forgot Password
          </h3>

          <input
            type="email"
            placeholder="Enter your registered email"
            className={`w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-800 text-sm bg-white ${
              error ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null); // Clear error when user types
            }}
          />

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {message && <p className="text-sm text-green-500 mt-2">{message}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-800 hover:text-slate-300 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
