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

      // ✅ calculate total
      const totalAmount = data.reduce((sum, exp) => sum + (exp.amount || 0), 0);
      setTotal(totalAmount);
    });

    return () => unsub();
  }, [user]);

  return (
    <div>
      <h3>Total Expense: ₹{total}</h3> {/* ✅ total expense */}
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            ₹{exp.amount} - {exp.category} ({exp.note})
          </li>
        ))}
      </ul>
    </div>
  );
}
