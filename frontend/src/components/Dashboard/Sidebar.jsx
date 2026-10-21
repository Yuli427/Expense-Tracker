import '../css/Sidebar.css'
function Sidebar({ activePage, setActivePage ,handleLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Expense Tracker</h2>
      </div>

      <nav className="sidebar-menu">
        <button
          className="sidebar-item"
          onClick={() => setActivePage('overview')}
        >Overview
        </button>

        <button
          className="sidebar-item"
          onClick={() => setActivePage('expenses')}
        >Expenses
        </button>
        
        <button
          className="sidebar-item"
          onClick={() => setActivePage('income')}
        >Incomes
        </button>

        <button className="sidebar-item"
          onClick={() => setActivePage('categories')}
          >Categories
          </button>

        <button className="sidebar-item"
        onClick={()=> setActivePage('budget')}
        >Budgets</button>

        <button className="sidebar-item"
        onClick={()=>setActivePage('analytics')}
        >Analytics</button>



      </nav>

      <div className="sidebar-bottom logout">
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar