import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import AuthForm from "./components/AuthForm";

function App() {
  const [user, setUser] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // ✅ updates when user logs in or out
    });
    return () => unsubscribe();
  }, []);

  // If not logged in, show login/signup form
  if (!user) return <AuthForm setUser={setUser} />;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>💰 Cloud Expense Tracker</h1>
      <button onClick={() => signOut(auth)}>Logout</button>

      {/* ✅ Pass the logged-in user to child components */}
      <AddExpenseForm user={user} />
      <ExpenseList user={user} />
    </div>
  );
}

export default App;
