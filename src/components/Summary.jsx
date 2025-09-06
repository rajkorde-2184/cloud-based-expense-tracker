import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Summary() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "expenses"), (snapshot) => {
      let sum = 0;
      snapshot.docs.forEach((doc) => (sum += doc.data().amount || 0));
      setTotal(sum);
    });
    return () => unsub();
  }, []);

  return <h3>Total Spent: ₹{total}</h3>;
}