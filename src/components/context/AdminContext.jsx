import { createContext, useCallback, useEffect, useState } from "react";

import CryptoJS from "crypto-js";
import { useIdleTimer } from "react-idle-timer";
import api from "../axiosInstance/api";

export const AdminContext = createContext();

const ENCRYPTION_KEY = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY; // Use an environment variable in production

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      //console.log("Encrypted data from localStorage:", savedAdmin);
      const bytes = CryptoJS.AES.decrypt(savedAdmin, ENCRYPTION_KEY);
      //console.log("Decrypted bytes:", bytes);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      //console.log("Decrypted data:", decryptedData);
      return JSON.parse(decryptedData);
    }
    return null;
  });

  const updateAdmin = (adminData) => {
    setAdmin(adminData); // Update context state
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(adminData),
      ENCRYPTION_KEY
    ).toString();
    localStorage.setItem("admin", encryptedData); // Save encrypted data to localStorage
  };

  const logoutAdmin = useCallback(async () => {
    try {
      if (admin && admin.adminToken) {
        const response = await api.post(
          "/api/admin/logout",
          { adminEmail: admin.email }, // send user email
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${admin.adminToken}`,
            },
          }
        );

        if (response.status === 200) {
          // console.log("Logout successful");
          setAdmin(null);
          localStorage.removeItem("admin");
          setTimeout(() => {
            window.location.href = "/admin/";
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }, [admin]);

  // Use the react-idle-timer hook
  const handleOnIdle = () => {
    // console.log("User is idle. Logging out.");
    alert('User is idle for 30 minutes. Logging out.....')
    logoutAdmin();
  };

  useIdleTimer({
    timeout: 1800000, // 30 minutes (1,800,000 milliseconds)
    onIdle: handleOnIdle,
    debounce: 500,   // Optional: Debounce idle detection by 500ms
    disabled: !admin, // Disable when user is false
  });

  // check token expiration and auto-logout
  useEffect(() => {
    if (admin && admin.tokenExpiration) {
      const expirationTime = new Date(admin.tokenExpiration).getTime();
      const currentTime = new Date().getTime();

      if (currentTime >= expirationTime) {
        logoutAdmin();
      }
    }
  }, [admin, logoutAdmin]);

  return (
    <AdminContext.Provider value={{ admin, updateAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
