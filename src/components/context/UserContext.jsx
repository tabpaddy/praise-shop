import { createContext, useEffect, useState } from "react";

import CryptoJS from "crypto-js";

export const UserContext = createContext();

const ENCRYPTION_KEY = "your-encryption-key"; // Use an environment variable in production

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Decrypt user data from localStorage on initialization
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const bytes = CryptoJS.AES.decrypt(savedUser, ENCRYPTION_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    }
    return null;
  });

  const updateUser = (userData) => {
    setUser(userData); // Update context state
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(userData),
      ENCRYPTION_KEY
    ).toString();
    localStorage.setItem("user", encryptedData); // Save encrypted data to localStorage
  };

  const logoutUser = () => {
    setUser(null); // Clear context state
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  // Check token expiration and auto-logout
  useEffect(() => {
    if (user && user.tokenExpiration) {
      const currentTime = Date.now();
      const tokenExpiryTime = new Date(user.tokenExpiration).getTime();

      if (currentTime > tokenExpiryTime) {
        logoutUser(); // Logout if token is expired
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
