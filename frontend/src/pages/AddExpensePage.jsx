import ExpenseForm from '../components/ExpenseForm';

export default function AddExpensePage() {
  return (
    <div className="page-body">
      <div className="section-header">
        <div>
          <h1 className="section-title">Add New Expense</h1>
          <p className="section-subtitle">Fill in the details to record a new expense</p>
        </div>
      </div>
      <ExpenseForm />
    </div>
  );
}
