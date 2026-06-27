import { auth } from "../firebase/config";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Expense Tracker</h1>

      <h3>
        👤 {auth.currentUser?.email}
      </h3>

      <p>
        Manage your income, expenses and reports
        from the navigation bar.
      </p>
    </div>
  );
}

export default Home;