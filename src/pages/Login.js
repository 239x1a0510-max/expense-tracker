import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        Welcome back!
        <br />
        Login into your account
      </h1>

      {/* Email */}
      <input
        style={{
          width: "400px",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        style={{
          width: "400px",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Login Button */}
      <button
        style={{
          width: "400px",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          fontSize: "18px",
        }}
        onClick={handleLogin}
      >
        Login
      </button>

      {/* Remember + Forgot Password */}
      <div
        style={{
          width: "400px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            style={{
              width: "18px",
              height: "18px",
              margin: 0,
            }}
          />
          Remember me
        </label>

        <span
          onClick={handleForgotPassword}
          style={{
            color: "#2563eb",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Forgot Password?
        </span>
      </div>

      {/* Signup */}
      <p style={{ fontSize: "18px" }}>
        Don't have an account?{" "}
        <span
          style={{
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/register")}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;