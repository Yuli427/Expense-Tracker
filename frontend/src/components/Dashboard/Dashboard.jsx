
import { getAllExpenses, createExpense } from '../../api/expenseApi'
import { getAllIncomes,createIncome } from '../../api/incomeApi'
import { getAllCategories, createCategory } from '../../api/categoryApi'
import { useState, useEffect } from 'react'
import { generateExpense,generateIncome } from '../../api/aiApi'
import { getAllBudgets } from '../../api/budgetsApi'
import Sidebar from './Sidebar'
import ManageCategories from './ManageCategories'
import ManageExpenses from './ManageExpenses'
import ManageIncome from './ManageIncome'
import ManageBudget from './ManageBudget'
import Analytics from './Analytics'
import '../css/Dashboard.css'




function Dashboard()
 {
  //Show form
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showIncomeForm, setShowIncomeForm] = useState(false)

  const [newCategory, setNewCategory] = useState('')

  const [activePage, setActivePage] = useState('overview')
  
  //expense
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [expenses, setExpenses] = useState([])
  
  const [editingExpense, setEditingExpense] = useState(null)
  const [categories, setCategories] = useState([])

  // income
  const [incomes, setIncomes] = useState([])
  const [editingIncome, setEditingIncome] = useState(null)
  const [incomeAmount, setIncomeAmount] = useState('')
  const [incomeDescription, setIncomeDescription] = useState('')
  const [incomeCategory, setIncomeCategory] = useState('')
  const [incomeDate, setIncomeDate] = useState('')

  //ai
  const [aiPrompt, setAiPrompt] = useState('')


  //Budget
  const [budgets, setBudgets] = useState([])
  const [editingBudget, setEditingBudget] = useState(null)

useEffect(() => {
    getAllExpenses()
      .then((response) => {
        console.log(response.data)
        setExpenses(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

useEffect(() => {
  getAllCategories()
    .then((response) => {
      console.log(response.data)
      setCategories(response.data)
       if (response.data.length > 0) {
        setCategory(response.data[0].id.toString())
      }
    })
    .catch((error) => {
      console.error(error)
    })
}, [])

useEffect(() => {
    getAllIncomes()
      .then((response) => {
        console.log(response.data)
        setExpenses(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])


  useEffect(() => {
  getAllBudgets()
    .then((response) => {
      console.log(response.data)
      setBudgets(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}, [])

//logout

function handleLogout() {
  localStorage.removeItem('accessToken')
  window.location.href = '/'
}

//add expense
async function handleAddExpense() {
  if (
    amount.trim() === '' ||
    date.trim() === ''
  ) {
    return
  }
  
  const selectedCategory=categories.find(
    (item)=>item.id===Number(category)
  )

  const newExpense = {
    amount,
    description,
    expenseDate: date,
    categoryDto: selectedCategory
  }

  try {
    const response = await createExpense(newExpense)

    setExpenses([...expenses, response.data])

    setAmount('')
    setDescription('')
    setCategory('')
    setDate('')
    setShowExpenseForm(false)
  } catch (error) {
    console.error(error)
  }
  
}

//add income
async function handleAddIncome() {
  if (
    incomeAmount.trim() === '' ||
    incomeDate.trim() === ''
  ) {
    return
  }
  

  const newIncome = {
    amount: incomeAmount,
    description:incomeDescription,
    incomeDate: incomeDate,
    incomeCategory:incomeCategory,
  }

  try {
    const response = await createIncome(newIncome)

    setIncomes([...incomes, response.data])

    setIncomeAmount('')
    setIncomeDescription('')
    setIncomeCategory('')
    setIncomeDate('')
    setShowIncomeForm(false)
  } catch (error) {
    console.error(error)
  }
  
}
//generate expense- ai
async function handleGenerateExpense() {
  if (aiPrompt.trim() === '') {
    return
  }

  try {
    const response = await generateExpense(aiPrompt)

    setExpenses([...expenses, response.data])

    setAiPrompt('')

  } catch (error) {
    console.error(error)
  }
}
async function handleGenerateIncome() {
  if (aiPrompt.trim() === '') {
    return
  }

  try {
    const response = await generateIncome(aiPrompt)

    setIncomes([...incomes, response.data])

    setAiPrompt('')

  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="dashboard">
      <Sidebar 
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

    <main className="dashboard-main">

    {activePage === 'overview' && (
      <>
        <div className="dashboard-actions">

          {/* add expense form */}
          {showExpenseForm && (
          <div className='overlay'>
            <div className="expense-form">
              <h2>Add New Expense</h2>

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* select category */}

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}

              </select>
              

              <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
              />

              <button onClick={() => setShowExpenseForm(false)}>
                Cancel
              </button>

              <button onClick={handleAddExpense}>
                Add Expense
              </button>

            </div>
            </div>
          )}
          {/* add expense card */}
          <div className="add-expense-card">
            <h2>Add Expense</h2>
            <p>Record a new expense.</p>

            <button className="add-expense-button"
              onClick={() => setShowExpenseForm(true)}
              >
              + Add Expense
            </button>
          </div>

          {/* add income form */}
          {showIncomeForm && (
          <div className='overlay'>
          <div className="income-form">
            <h2>Add New Income</h2>

            <input
              type="number"
              placeholder="Amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={incomeDescription}
              onChange={(e) => setIncomeDescription(e.target.value)}
            />

            <select
              value={incomeCategory}
              onChange={(e) => setIncomeCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Refund">Refund</option>
              <option value="Gift">Gift</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              value={incomeDate}
              onChange={(e) => setIncomeDate(e.target.value)}
            />

            <button onClick={() => setShowIncomeForm(false)}>
              Cancel
            </button>

            <button onClick={handleAddIncome}>
              Add Income
            </button>
          </div>
          </div>
        )}

        <div className="add-income-card">
          <h2>Add Income</h2>
          <p>Record a new income.</p>

          <button
            className="add-income-button"
            onClick={() => setShowIncomeForm(true)}
          >
            + Add Income
          </button>
        </div>

        {/* ai card */}
          <div className="ai-card">
            <h2>✦ AI Assistant</h2>
            <p>Tell me what you spent or earned.</p>

            <input
              type="text"
              placeholder="e.g. Spent $20 on Uber"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <div className="ai-buttons">
              <button onClick={handleGenerateExpense}>
                Generate Expense
              </button>

              <button onClick={handleGenerateIncome}>
                Generate Income
              </button>
            </div>
          </div> 
          </div>

          {/* list recent expense */}
          <div className="recent-expenses">
            <h2>Recent Expenses</h2>

            {expenses.length === 0 ? (
              <p>No expenses yet.</p>
            ) : (
              expenses.map((expense) => (
            <div className="expense-item" key={expense.id}>
              <div>
                <strong>{expense.categoryDto?.name}</strong>
                <p>{expense.expenseDate}</p>
              </div>

              <span>${expense.amount}</span>
            </div>
              ))
            )}
          </div>


          </>
          )}

        {activePage === 'categories' && (
          <ManageCategories
            categories={categories}
            setCategories={setCategories}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
          />
        )}
        {activePage === 'expenses' && (
        <ManageExpenses
          expenses={expenses}
          setExpenses={setExpenses}
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
          categories={categories}
        />
)}
        {activePage === 'income' && (
        <ManageIncome
          incomes={incomes}
          setIncomes={setIncomes}
          editingIncome={editingIncome}
          setEditingIncome={setEditingIncome}
        />
      )}
      {activePage === 'analytics' && (
      <Analytics
        expenses={expenses}
        incomes={incomes}
        budgets={budgets}
      />
      )}
      {activePage === 'budget' && (
      <ManageBudget
        budgets={budgets}
        setBudgets={setBudgets}
        editingBudget={editingBudget}
        setEditingBudget={setEditingBudget}
        categories={categories}
        expenses={expenses}
      />
    )}


      
        
      </main>
    </div>
  )
}

export default Dashboard