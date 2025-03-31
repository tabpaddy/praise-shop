import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminApp from "./components/admin/AdminApp";
import ClientApp from "./components/client/ClientApp";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<ClientApp />} />
      <Route path="/*" element={<AdminApp />} />
    </Routes>
  );
}

export default App;
