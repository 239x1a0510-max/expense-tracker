import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import AddIncome from "./pages/AddIncome";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route
  path="/"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/add" element={<AddExpense />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/income" element={<AddIncome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 