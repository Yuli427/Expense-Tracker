import axiosInstance from './axiosInstance'

const BUDGET_API_URL = 'http://localhost:8081/api/budgets'


export const getAllBudgets = () => {

  const token = localStorage.getItem('accessToken')

  return axiosInstance.get(BUDGET_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createBudget = (budgetData) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.post(
    BUDGET_API_URL,
    budgetData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const deleteBudget = (id) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.delete(
    `${BUDGET_API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}


export const updateBudget = (id, budgetData) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.put(
    `${BUDGET_API_URL}/${id}`,
    budgetData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const getBudgetsByMonth = (month) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.get(
    `${BUDGET_API_URL}/month/${month}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}