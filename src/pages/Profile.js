import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "15px",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <h2>👤 User Profile</h2>

        <hr />

        <p>
          <strong>Email:</strong>
        </p>

        <p>{auth.currentUser?.email}</p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;