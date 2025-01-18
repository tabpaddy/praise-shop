import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminApp from "./components/admin/AdminApp";
import ClientApp from "./components/client/ClientApp";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<ClientApp />} />
    </Routes>
  );
}

export default App;
