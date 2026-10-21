import axiosInstance from './axiosInstance'

const EXPENSE_API_URL = 'http://localhost:8081/api/expenses'

export const getAllExpenses = () => {

  const token = localStorage.getItem('accessToken')

  return axiosInstance.get(EXPENSE_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createExpense = (expenseData) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.post(
    EXPENSE_API_URL,
    expenseData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const deleteExpense = (id) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.delete(
    `${EXPENSE_API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}


export const updateExpense = (id, expenseData) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.put(
    `${EXPENSE_API_URL}/${id}`,
    expenseData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}