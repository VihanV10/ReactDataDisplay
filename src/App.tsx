import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/components/Login";
import Dashboard from "../src/Dashboard";
import Register from "./components/Register";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

export default App;

