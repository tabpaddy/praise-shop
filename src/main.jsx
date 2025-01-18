import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { UserProvider } from "./components/context/UserContext"; // Adjust the path as needed
import { store } from "./components/redux/Store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
