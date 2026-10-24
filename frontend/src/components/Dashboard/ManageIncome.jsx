import '../css/ManageIncome.css'

function ManageIncome({
  incomes,
  setIncomes,
  editingIncome,
  setEditingIncome
}) {

  function handleDeleteIncome(id) {
    setIncomes(
      incomes.filter((income) => income.id !== id)
    )
  }

  function handleSaveIncome() {
    setIncomes(
      incomes.map((income) =>
        income.id === editingIncome.id
          ? editingIncome
          : income
      )
    )

    setEditingIncome(null)
  }

  return (
    <div className="manage-income">

      <h2>All Income</h2>


      {editingIncome && (
        <div className="edit-income-form">

          <h3>Edit Income</h3>

          <input
            type="number"
            value={editingIncome.amount}
            onChange={(e) =>
              setEditingIncome({
                ...editingIncome,
                amount: e.target.value
              })
            }
          />

          <input
            type="text"
            value={editingIncome.description || ''}
            onChange={(e) =>
              setEditingIncome({
                ...editingIncome,
                description: e.target.value
              })
            }
          />

          <select
            value={editingIncome.incomeCategory || ''}
            onChange={(e) =>
              setEditingIncome({
                ...editingIncome,
                incomeCategory: e.target.value
              })
            }
          >
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
            <option value="Refund">Refund</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            value={editingIncome.incomeDate}
            onChange={(e) =>
              setEditingIncome({
                ...editingIncome,
                incomeDate: e.target.value
              })
            }
          />

          <button onClick={handleSaveIncome}>
            Save
          </button>

          <button onClick={() => setEditingIncome(null)}>
            Cancel
          </button>

        </div>
      )}


      {incomes.length === 0 ? (

        <p>No income yet.</p>

      ) : (

        <div className="income-list">

          {incomes.map((income) => (

            <div
              className="manage-income-row"
              key={income.id}
            >

              <div>
                <strong>
                  {income.description || ''}
                </strong>

                <p>
                  {income.incomeCategory} · {income.incomeDate}
                </p>
              </div>

              <span>
                ${income.amount}
              </span>

              <div className="manage-income-actions">

                <button
                  onClick={() => setEditingIncome(income)}
                >
                  Edit
                </button>

                <button  className='className="delete-income-x'
                  onClick={() => handleDeleteIncome(income.id)}
                >
                  ✖
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default ManageIncome