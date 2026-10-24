import '../css/ManageCategories.css'
import { createCategory } from '../../api/categoryApi'

function ManageCategories({
  categories,
  setCategories,
  newCategory,
  setNewCategory
}) {

  async function handleAddCategory() {
    if (newCategory.trim() === '') {
      return
    }

    try {
    const response = await createCategory({
      name: newCategory
    })

    setCategories([...categories, response.data])
    setNewCategory('')
    } catch (error) {
        console.error(error)
    }


  }

  async function handleDeleteCategory(categoryToDelete) {
    setCategories(
      categories.filter(
        (category) => category.id!== categoryToDelete
      )
    )
  }

  return (
    <div className="manage-categories">
      <h2>Manage Categories</h2>
        <p className="manage-categories-subtitle">
            Add or remove expense categories.
        </p>

    <div className="category-add-section">
        <input
        type="text"
        placeholder="New category name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        />

        <button onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

       <div className="category-grid">
        {categories.map((category) => (
            <div className="category-row" key={category.id}>
            <span>{category.name}</span>

            <button
              onClick={() => handleDeleteCategory(category.id)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageCategories