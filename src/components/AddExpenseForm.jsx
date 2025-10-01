import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function AddExpenseForm({ user }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !user) return;

    await addDoc(collection(db, "expenses"), {
      userId: user.uid,
      amount: Number(amount),
      category,
      note,
      createdAt: serverTimestamp(),
    });

    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Expense</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded-lg focus:ring focus:ring-blue-300"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded-lg focus:ring focus:ring-blue-300"
      />

      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full mb-3 p-2 border rounded-lg focus:ring focus:ring-blue-300"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Expense
      </button>
    </form>
  );
}
