import { createContext, useCallback, useEffect, useState } from "react";

import CryptoJS from "crypto-js";
import axios from "axios";
import { useIdleTimer } from "react-idle-timer";

export const UserContext = createContext();

const ENCRYPTION_KEY = "your-encryption-key"; // Use an environment variable in production

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Decrypt user data from localStorage on initialization
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      console.log("Encrypted data from localStorage:", savedUser);
      const bytes = CryptoJS.AES.decrypt(savedUser, ENCRYPTION_KEY);
      console.log("Decrypted bytes:", bytes);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted data:", decryptedData);
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

  const logoutUser = useCallback(async () => {
    try {
      if (user && user.userToken) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/logout",
          { userEmail: user.email }, // Send user email
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.userToken}`,
            },
          }
        );
  
        if (response.status === 200) {
          //console.log("Logout successful");
          setUser(null);
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }, [user]);

  // use the react-idle-timer hook
  const handleOnIdle = () => {
    console.log("User is idle");
    logoutUser();
  };
  
  useIdleTimer({
    timeout: 1000 * 60 * 30, // 30 minutes
    onIdle: handleOnIdle,
    debounce: 500,
  });
  

  // Check token expiration and auto-logout
  useEffect(() => {
    if (user && user.tokenExpiration) {
      const currentTime = Date.now();
      const tokenExpiryTime = new Date(user.tokenExpiration).getTime();
  
      console.log("Current Time:", currentTime);
      console.log("Token Expiry Time:", tokenExpiryTime);
  
      if (currentTime > tokenExpiryTime) {
        console.log("Token expired. Logging out...");
        logoutUser();
      }
    }
  }, [user, logoutUser]);
  

  
  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
