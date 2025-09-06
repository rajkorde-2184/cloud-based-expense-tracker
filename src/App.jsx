import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AddExpenseForm from "<AddExpenseForm user={user}" />;
import ExpenseList from "<ExpenseList user={user} />";
import AuthForm from "./components/AuthForm";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // ✅ updates on login/logout
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <AuthForm setUser={setUser} />;

  return (
    <div>
      <button onClick={() => signOut(auth)}>Logout</button>
      <AddExpenseForm user={user} />
      <ExpenseList user={user} />
    </div>
  );
}

export default App;
