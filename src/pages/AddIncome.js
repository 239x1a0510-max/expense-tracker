import { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

function AddIncome() {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeList, setIncomeList] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    const querySnapshot = await getDocs(
      collection(db, "income")
    );

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setIncomeList(data);
  };

  const saveIncome = async () => {
  if (editId) {
    await updateDoc(doc(db, "income", editId), {
      source,
      amount: Number(amount),
    });

    alert("Income Updated!");
    setEditId(null);
  } else {
    await addDoc(collection(db, "income"), {
      source,
      amount: Number(amount),
      createdAt: new Date(),
    });

    alert("Income Added");
  }

  setSource("");
  setAmount("");

  fetchIncome();
};

  return (
    <div>
      <h1>Add Income</h1>

      <input
        type="text"
        placeholder="Income Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

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

      <button onClick={saveIncome}>
        {editId ? "Update Income" : "Add Income"}
      </button>

      <hr />

      <h2>Income Records</h2>

      {incomeList.map((item) => (
        <div key={item.id}>
          <h3>{item.source}</h3>
          <p>₹{item.amount}</p>

          <button onClick={() => {
            setEditId(item.id);
            setSource(item.source);
            setAmount(item.amount);
          }}>
                Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default AddIncome;