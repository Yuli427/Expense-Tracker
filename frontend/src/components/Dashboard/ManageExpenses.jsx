import '../css/ManageExpenses.css'
import { deleteExpense } from '../../api/expenseApi'
import { updateExpense } from '../../api/expenseApi'

function ManageExpenses({
  expenses,
  setExpenses,
  editingExpense,
  setEditingExpense,
  categories
}) {

  async function handleDeleteExpense(id) {
      try {
      await deleteExpense(id)

      setExpenses(
        expenses.filter((expense) => expense.id !== id)
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSaveExpense() {
      try {
      const response = await updateExpense(
        editingExpense.id,
        editingExpense
      )

      setExpenses(
        expenses.map((expense) =>
          expense.id === response.data.id
            ? response.data
            : expense
        )
      )

      setEditingExpense(null)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="manage-expenses">

      <h2>All Expenses</h2>

      <p className="manage-expenses-subtitle">
        View and manage all your expenses.
      </p>


      {/* Edit Expense */}
      {editingExpense && (
        <div className="edit-expense-form">

          <h3>Edit Expense</h3>


          {/* Amount */}
          <input
            type="number"
            value={editingExpense.amount}
            onChange={(e) =>
              setEditingExpense({
                ...editingExpense,
                amount: e.target.value
              })
            }
          />


          {/* Description */}
          <input
            type="text"
            value={editingExpense.description || ''}
            onChange={(e) =>
              setEditingExpense({
                ...editingExpense,
                description: e.target.value
              })
            }
          />


          {/* Date */}
          <input
            type="date"
            value={editingExpense.expenseDate}
            onChange={(e) =>
              setEditingExpense({
                ...editingExpense,
                expenseDate: e.target.value
              })
            }
          />


          {/* Category */}
          <select
            value={editingExpense.categoryDto?.id || ''}
            onChange={(e) => {

              const selectedCategory = categories.find(
                (category) =>
                  category.id === Number(e.target.value)
              )

              setEditingExpense({
                ...editingExpense,
                categoryDto: selectedCategory
              })
            }}
          >

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}

          </select>


          <button onClick={handleSaveExpense}>
            Save
          </button>

          <button
            onClick={() => setEditingExpense(null)}
          >
            Cancel
          </button>

        </div>
      )}


      {/* Expense List */}
      {expenses.length === 0 ? (

        <p>No expenses yet.</p>

      ) : (

        <div className="expense-list">

          {expenses.map((expense) => (

            <div
              className="manage-expense-row"
              key={expense.id}
            >

              <div>

                <strong>
                  {expense.description || ''}
                </strong>

                <p>
                  {expense.categoryDto?.name}
                  {' · '}
                  {expense.expenseDate}
                </p>

              </div>


              <span>
                ${expense.amount}
              </span>


              <div className="manage-expense-actions">

                <button
                  onClick={() =>
                    setEditingExpense(expense)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDeleteExpense(expense.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default ManageExpenses