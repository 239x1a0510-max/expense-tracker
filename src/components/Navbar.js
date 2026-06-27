import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 30px",
        backgroundColor: "#1e293b",
      }}
    >
      <div>
        <Link
          to="/"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/add"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Add Expense
        </Link>

        <Link
          to="/reports"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Reports
        </Link>

        <Link
          to="/income"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Add Income
        </Link>
      </div>

      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowProfile(!showProfile)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          👤 Profile
        </button>

        {showProfile && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "35px",
              backgroundColor: "white",
              color: "black",
              padding: "15px",
              borderRadius: "8px",
              minWidth: "220px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <p>{auth.currentUser?.email || "No user logged in"}</p>

            <button
              onClick={handleLogout}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;