import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

// eslint-disable-next-line no-unused-vars
import Charts from "../components/Charts";

// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { defaults } from "chart.js";

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    fetchExpenses();
    fetchIncome();
  }, []);

  const fetchExpenses = async () => {
    const querySnapshot = await getDocs(
      collection(db, "expenses")
    );

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setExpenses(data);
  };

  const fetchIncome = async () => {
    const querySnapshot = await getDocs(
      collection(db, "income")
    );

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setIncome(data);
  };

  // eslint-disable-next-line no-unused-vars
  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
    fetchExpenses();
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const totalIncome = income.reduce(
    (total, item) => total + item.amount,
    0
  );

  const balance = totalIncome - totalExpense;

  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";
    categoryTotals[category] =
      (categoryTotals[category] || 0) + expense.amount;
  });

  return (
  <div
    style={{
      padding: "30px",
      background: "#f4f6f9",
      minHeight: "100vh",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        color: "#1e293b",
      }}
    >
      Welcome 👋
    </h2>

    <p
      style={{
        textAlign: "center",
        color: "#666",
        marginBottom: "25px",
      }}
    >
      Track your income, expenses and financial reports.
    </p>

    <h1
      style={{
        textAlign: "center",
        color: "#0f172a",
        marginBottom: "35px",
      }}
    >
      Expense Tracker Dashboard
    </h1>

    {/* Summary Cards */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        marginBottom: "35px",
      }}
    >
      {/* Income */}
      <div
        style={{
          flex: 1,
          background: "#16a34a",
          color: "white",
          borderRadius: "15px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >
        <h3>Total Income</h3>
        <h1>₹{totalIncome}</h1>
      </div>

      {/* Expense */}
      <div
        style={{
          flex: 1,
          background: "#dc2626",
          color: "white",
          borderRadius: "15px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >
        <h3>Total Expenses</h3>
        <h1>₹{totalExpense}</h1>
      </div>

      {/* Balance */}
      <div
        style={{
          flex: 1,
          background: "#2563eb",
          color: "white",
          borderRadius: "15px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >
        <h3>Balance</h3>
        <h1>₹{balance}</h1>
      </div>
    </div>

    {/* Table + Chart */}
    <div
      style={{
        display: "flex",
        gap: "25px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          flex: 2,
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <h2>Recent Transactions</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#2563eb",
                color: "white",
              }}
            >
              <th style={{ padding: "12px" }}>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td style={{ padding: "12px", textAlign: "center" }}>{expense.title}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{expense.category}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{expense.date}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{expense.amount}</td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                    <button
                      onClick={() =>
                        navigate("/add", {
                          state: expense,
                        })
                      }
                    >
                      Edit
                    </button>

                    <button
                      style={{ marginLeft: "8px" }}
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Doughnut Chart */}
        <div className="chart-card">
          <Charts categoryTotals={categoryTotals} />
        </div>

      </div>
      </div>
  );
}

export default Dashboard;