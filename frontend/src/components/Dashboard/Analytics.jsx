import '../css/Analytics.css'
import { useState, useEffect } from 'react'
import { analyticsChat } from '../../api/aiApi'

function Analytics({ expenses, incomes , budgets}) {
   
  const totalIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  )

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  )

  const netBalance = totalIncome - totalExpense

  const savingsRate =
    totalIncome > 0
      ? (netBalance / totalIncome) * 100
      : 0
  
  
  //ai
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  //handle chat method
  async function handleAnalyticsChat() {
  if (aiQuestion.trim() === '') {
    return
  }

  try {
    setAiLoading(true)

    const response = await analyticsChat(aiQuestion)

    setAiAnswer(response.data.answer)

  } catch (error) {
    console.error(error)
  } finally {
    setAiLoading(false)
  }
}

  return (
    <div className="analytics">

      <h2>Analytics</h2>

      <p className="analytics-subtitle">
        Track your income, spending, and savings.
      </p>
      {/* summery section */}
      <div className="analytics-summary">

        <div className="analytics-card">
          <p>Total Income</p>
          <h3>${totalIncome.toFixed(2)}</h3>
        </div>

        <div className="analytics-card">
          <p>Total Expenses</p>
          <h3>${totalExpense.toFixed(2)}</h3>
        </div>

        <div className="analytics-card">
          <p>Net Balance</p>
          <h3>${netBalance.toFixed(2)}</h3>
        </div>

        <div className="analytics-card">
          <p>Savings Rate</p>
          <h3>{savingsRate.toFixed(1)}%</h3>
        </div>

      </div>
      
      {/* ai section */}
      <div className="analytics-ai">

        <h3>✦ AI Financial Assistant</h3>

        <p>
            Ask questions about your income and spending.
        </p>

        <div className="analytics-ai-input">

            <input
            type="text"
            placeholder="e.g. Where did I spend the most this month?"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            />

            <button
            onClick={handleAnalyticsChat}
            disabled={aiLoading}
            >
            {aiLoading ? 'Analyzing...' : 'Ask AI'}
            </button>

        </div>

        {aiAnswer && (
            <div className="analytics-ai-answer">
            <strong>AI Analysis</strong>
            <p>{aiAnswer}</p>
            </div>
        )}

        </div>

    </div>
  )
}

export default Analytics