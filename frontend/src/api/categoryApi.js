import axiosInstance from './axiosInstance'

const CATEGORY_API_URL = 'http://localhost:8081/api/categories'

export const getAllCategories = () => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.get(CATEGORY_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createCategory = (categoryData) => {
  const token = localStorage.getItem('accessToken')

  return axiosInstance.post(
    CATEGORY_API_URL,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}