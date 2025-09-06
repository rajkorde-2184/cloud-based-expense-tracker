import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function AddExpenseForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    console.log("Adding expense:", amount, category, note); // 👈 debug log

    try {
      await addDoc(collection(db, "expenses"), {
        amount: Number(amount),
        category,
        note,
        createdAt: serverTimestamp(),
      });
      console.log("✅ Expense saved!");
    } catch (err) {
      console.error("🔥 Firestore error:", err);
    }

    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}
