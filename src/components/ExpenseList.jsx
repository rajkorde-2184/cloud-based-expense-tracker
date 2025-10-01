import { useEffect, useState } from "react";
import { collection, query, orderBy, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ExpenseList({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);

      const totalAmount = data.reduce((sum, exp) => sum + (exp.amount || 0), 0);
      setTotal(totalAmount);
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">
        Total Expense: ₹{total}
      </h3>

      <ul className="space-y-3">
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-800">₹{exp.amount}</p>
              <p className="text-sm text-gray-600">
                {exp.category} — {exp.note || "No note"}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {exp.createdAt?.toDate().toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
