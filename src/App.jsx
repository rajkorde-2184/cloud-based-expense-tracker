import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>💰 Cloud Expense Tracker</h1>
      <AddExpenseForm />
      <Summary />
      <ExpenseList />
    </div>
  );
}

export default App;