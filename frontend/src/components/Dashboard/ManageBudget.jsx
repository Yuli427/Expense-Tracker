import '../css/ManageBudgets.css'
import { useState } from 'react'
import {
    createBudget,
  deleteBudget,
  updateBudget
} from '../../api/budgetsApi'

function ManageBudget({
  budgets,
  setBudgets,
  editingBudget,
  setEditingBudget,
  categories,
  expenses
}) {

const [amount, setAmount] = useState('')
const [category, setCategory] = useState('')
const [month, setMonth] = useState('')

async function handleAddBudget() {
  if (
    amount.trim() === '' ||
    month.trim() === '' ||
    category === ''
  ) {
    return
  }
  
  const selectedCategory=categories.find(
    (item)=>item.id===Number(category)
  )

  const newBudget = {
    amount,
    month,
    categoryDto: selectedCategory
  }

  try {
    const response = await createBudget(newBudget)

    setBudgets([...budgets, response.data])

    setAmount('')
    setCategory('')
    setMonth('')
  } catch (error) {
    console.error(error)
  }
  
}

  async function handleDeleteBudget(id) {
    try {
      await deleteBudget(id)

      setBudgets(
        budgets.filter((budget) => budget.id !== id)
      )

    } catch (error) {
      console.error(error)
    }
  }

  async function handleSaveBudget() {
    try {

      const response = await updateBudget(
        editingBudget.id,
        editingBudget
      )

      setBudgets(
        budgets.map((budget) =>
          budget.id === response.data.id
            ? response.data
            : budget
        )
      )

      setEditingBudget(null)

    } catch (error) {
      console.error(error)
    }
  }

  return (

    <div className="manage-budget">

      <h2>Budgets</h2>

      <p className="manage-budget-subtitle">
        Set and manage your monthly spending limits.
      </p>



      {/* add manage form */}
      <div className="add-budget-form">

        <h3>Add Budget</h3>

        <input
            type="number"
            placeholder="Budget amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />

        <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
        />

        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="">Select category</option>

            {categories.map((item) => (
            <option
                key={item.id}
                value={item.id}
            >
                {item.name}
            </option>
            ))}
        </select>

        <button onClick={handleAddBudget}>
            + Add Budget
        </button>

    </div>


      {/* edit budget form */}

      {editingBudget && (
        <div className="edit-budget-form">

          <h3>Edit Budget</h3>


          {/* amount */}

          <input
            type="number"
            value={editingBudget.amount}
            onChange={(e) =>
              setEditingBudget({
                ...editingBudget,
                amount: e.target.value
              })
            }
          />


          {/* month */}

          <input
            type="month"
            value={editingBudget.month}
            onChange={(e) =>
              setEditingBudget({
                ...editingBudget,
                month: e.target.value
              })
            }
          />


          {/* category */}

          <select
            value={editingBudget.categoryDto?.id || ''}
            onChange={(e) => {

              const selectedCategory = categories.find(
                (category) =>
                  category.id === Number(e.target.value)
              )

              setEditingBudget({
                ...editingBudget,
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


          <button onClick={handleSaveBudget}>
            Save
          </button>

          <button
            onClick={() => setEditingBudget(null)}
          >
            Cancel
          </button>

        </div>
      )}


      {/* budget list */}
      {budgets.map((budget) => {

        const spent = expenses
            .filter((expense) =>
            expense.categoryDto?.id === budget.categoryDto?.id &&
            expense.expenseDate?.startsWith(budget.month)
            )
            .reduce(
            (sum, expense) => sum + Number(expense.amount),
            0
            )

        const remaining =
            Number(budget.amount) - spent

        const progress =
        Number(budget.amount) > 0
            ? (spent / Number(budget.amount)) * 100
            : 0

        const progressWidth = Math.min(progress, 100)

    

        return (
            <div
            className="manage-budget-row"
            key={budget.id}
            >

            <div>
                <strong>
                {budget.categoryDto?.name}
                </strong>

                <p>{budget.month}</p>
            </div>
           {/* remaining */}
            <div className="budget-numbers">
                <p>
                Budget: ${budget.amount}
                </p>

                <p>
                Spent: ${spent.toFixed(2)}
                </p>

                <p>
                Remaining: ${remaining.toFixed(2)}
                </p>
            </div>
            
            {/* budget bar */}
            <div className="budget-progress">

            <div className="budget-progress-bar">
                <div
                className="budget-progress-fill"
                style={{
                    width: `${progressWidth}%`
                }}
                />
            </div>

            <span className="budget-progress-label">
            {progress.toFixed(0)}% used
            </span>

            </div>

            {/* edit */}

            <div className="manage-budget-actions">

                <button
                onClick={() =>
                    setEditingBudget(budget)
                }
                >
                Edit
                </button>

                <button
                onClick={() =>
                    handleDeleteBudget(budget.id)
                }
                >
                Delete
                </button>

            </div>

            </div>
        )
        })}


    </div>
  )
}

export default ManageBudget