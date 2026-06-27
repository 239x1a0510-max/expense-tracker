import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useLocation } from "react-router-dom";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const expenseData = location.state;

  useEffect(() => {
    if (expenseData) {
      setEditId(expenseData.id);
      setTitle(expenseData.title);
      setCategory(expenseData.category);
      setAmount(expenseData.amount);
      setDate(expenseData.date);
    }
  }, [expenseData]);

  const saveExpense = async () => {
    try {
      if (editId) {
        await updateDoc(doc(db, "expenses", editId), {
          title,
          category,
          amount: Number(amount),
          date,
        });

        alert("Expense Updated Successfully!");
      } else {
        await addDoc(collection(db, "expenses"), {
          title,
          category,
          amount: Number(amount),
          date,
          createdAt: new Date(),
        });

        alert("Expense Added Successfully!");
      }

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setEditId(null);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>
        {editId ? "Edit Expense" : "Add Expense"}
      </h1>

      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveExpense}>
        {editId ? "Update Expense" : "Add Expense"}
      </button>
    </div>
  );
}

export default AddExpense;