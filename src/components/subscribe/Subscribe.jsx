import { useState, useEffect } from "react";
import axios from "axios";

export default function Subscribe() {
  const [email, setEmail] = useState(""); // To store user's email
  const [ipAddress, setIpAddress] = useState(""); // To store user's IP address
  const [message, setMessage] = useState(""); // To display success/error messages

  // Fetch the user's IP address on component mount
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json"); // Use IPify API to get the user's IP
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    // Temporarily store email and IP (to send to backend later)
    console.log({ email, ipAddress });

    setMessage("Subscription data stored successfully!");
    setEmail(""); // Clear the input field
  };

  return (
    <div className="flex flex-col items-center my-20 px-4 sm:px-20">
      <h3 className="font-outfit font-medium text-neutral-900 my-2 text-2xl sm:text-3xl md:text-4xl text-center">
        Subscribe now & get 20% off
      </h3>
      <article className="font-outfit font-normal text-stone-400 text-base sm:text-lg my-2 text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </article>
      <form className="flex w-full max-w-3xl mt-4" onSubmit={handleSubscribe}>
        <input
          className="font-outfit font-normal text-black text-sm bg-white p-3 w-full border border-gray-300 focus:outline-none focus:ring-0 focus:ring-black"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit" className="bg-black text-white px-6 py-3">
          SUBSCRIBE
        </button>
      </form>
      {message && (
        <p className="text-sm text-green-500 mt-2 font-outfit">{message}</p>
      )}
    </div>
  );
}
