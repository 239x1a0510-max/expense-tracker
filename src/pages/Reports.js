import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Papa from "papaparse";
import jsPDF from "jspdf";

function Reports() {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    fetchExpenses();
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

  const filteredExpenses = selectedMonth
    ? expenses.filter((expense) =>
        expense.date?.startsWith(selectedMonth)
      )
    : expenses;

  const totalReportExpense = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const reportCategories = {};

  filteredExpenses.forEach((expense) => {
    const category = expense.category || "Other";

    reportCategories[category] =
      (reportCategories[category] || 0) + expense.amount;
  });

  const exportCSV = () => {
    const csv = Papa.unparse(
      filteredExpenses.map((expense) => ({
        Title: expense.title,
        Category: expense.category,
        Date: expense.date,
        Amount: expense.amount,
      }))
    );

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "monthly-report.csv";

    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Monthly Expense Report", 20, 20);

    doc.setFontSize(12);
    doc.text(
      `Total Expenses: ₹${totalReportExpense}`,
      20,
      35
    );

    let y = 50;

    filteredExpenses.forEach((expense) => {
      doc.text(
        `${expense.title} | ${expense.category} | ${expense.date} | ₹${expense.amount}`,
        20,
        y
      );

      y += 10;
    });

    doc.save("monthly-report.pdf");
  };

  return (
    <div>
      <h1>Monthly Reports</h1>

      <button onClick={exportCSV}>
        Export CSV
      </button>

      <br />
      <br />

      <button onClick={exportPDF}>
        Export PDF
      </button>

      <br />
      <br />

      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      <br />
      <br />

      <h2>Total Expenses: ₹{totalReportExpense}</h2>

      <h3>Category Summary</h3>

      {Object.entries(reportCategories).map(
        ([category, total]) => (
          <p key={category}>
            {category}: ₹{total}
          </p>
        )
      )}

      <hr />

      {filteredExpenses.map((expense) => (
        <div key={expense.id}>
          <h3>{expense.title}</h3>

          <p>Category: {expense.category}</p>

          <p>Date: {expense.date}</p>

          <p>₹{expense.amount}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Reports;