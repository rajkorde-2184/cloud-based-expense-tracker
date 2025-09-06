import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import AuthForm from "./components/AuthForm";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <AuthForm setUser={setUser} />;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>💰 Cloud Expense Tracker</h1>
      <button onClick={()=>signOut(auth)}>Logout</button>
      <AddExpenseForm user={user} />
      <Summary user={user} />
      <ExpenseList user={user} />
    </div>
  );
}

export default App;
