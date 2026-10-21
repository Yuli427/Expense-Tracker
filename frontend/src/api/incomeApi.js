import axiosInstance from './axiosInstance'

const INCOMES_API_URL = 'http://localhost:8081/api/incomes'

export const getAllIncomes = () => {
 const token = localStorage.getItem('accessToken')

  return axiosInstance.get(INCOMES_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createIncome = (incomeData) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.post(
    INCOMES_API_URL,
    incomeData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const deleteIncome = (id) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.delete(
    `${INCOMES_API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const updateIncome = (id, incomeData) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.put(
    `${INCOMES_API_URL}/${id}`,
    incomeData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}