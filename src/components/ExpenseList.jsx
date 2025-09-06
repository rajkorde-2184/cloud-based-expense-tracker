import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ExpenseList({ user }) { // ✅ accept user as prop
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!user) return; // ✅ wait for user to be logged in

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid), // ✅ filter by current user
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setExpenses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [user]); // ✅ re-run when user changes

  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp.id}>
          ₹{exp.amount} - {exp.category} ({exp.note})
        </li>
      ))}
    </ul>
  );
}
