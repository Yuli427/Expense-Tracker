import axiosInstance from './axiosInstance'

const AI_API_URL = 'http://localhost:8081/api/ai'

export const generateExpense = (prompt) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.post(
    `${AI_API_URL}/generate-expense`,
    {
      prompt: prompt
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const generateIncome = (prompt) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.post(
    `${AI_API_URL}/generate-income`,
    {
      prompt: prompt
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const analyticsChat = (prompt) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.post(
    `${AI_API_URL}/analytics-chat`,
    {
      prompt: prompt
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}